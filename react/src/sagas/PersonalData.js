
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import { getUserData, getUserDataFail, postUserDataFail } from "actions/PersonalData";



export function* requestPersonalData () {
    try {
        yield put(getUserData());
        const config = select(state => state.config);
        yield call(fetchPersonalData, config);
    } catch(error) {
        yield put(getUserDataFail(error.toString()));
    }
}


function* fetchPersonalData (config) {
    yield window.fetch(config.PERSONAL_DATA_URL, {
      // To automatically send cookies only for the current domain,
      // set credentials to 'same-origin'; use 'include' for CORS
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(userdata => put(userdata))
}


export function* savePersonalData () {
    try {
        const config = select(state => state.config);
        const data = select(state =>  ({
            ...state.personal_data
        }));
        delete data.is_fetching;
        delete data.failed;
        yield call(sendPersonalData, config, data);
    } catch(error) {
        yield put(postUserDataFail(error.toString()));
    }
}

function* sendPersonalData (config, data) {
    yield window.fetch(config.PERSONAL_DATA_URL, {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(userdata => put(userdata))
}
