
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken } from "actions/common";
import { getUserdata, getUserdataFail, postUserdataFail } from "actions/PersonalData";



export function* requestPersonalData () {
    try {
        yield put(getUserdata());
        const config = yield select(state => state.config);
        const userdata = yield call(fetchPersonalData, config);
        yield put(putCsrfToken(userdata));
        yield put(userdata);
    } catch(error) {
        yield put(getUserdataFail(error.toString()));
    }
}


export function fetchPersonalData (config) {
    return window.fetch(config.PERSONAL_DATA_URL + 'user', {
      // To automatically send cookies only for the current domain,
      // set credentials to 'same-origin'; use 'include' for CORS
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
}


export function* savePersonalData () {
    try {
        const config = yield select(state => state.config);
        const data = yield select(state =>  ({
            ...state.personal_data,
            csrf_token: state.config.csrf_token
        }));
        delete data.is_fetching;
        delete data.failed;
        const resp = yield call(sendPersonalData, config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield put(postUserdataFail(error.toString()));
    }
}

export function sendPersonalData (config, data) {
    return window.fetch(config.PERSONAL_DATA_URL + 'user', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
