
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import { getCredentials, getCredentialsFail } from "actions/Security";



export function* requestCredentials () {
    try {
        yield put(getCredentials());
        const config = yield select(state => state.config);
        const credentials = yield call(fetchCredentials, config);
        yield put(credentials);
    } catch(error) {
        yield put(getCredentialsFail(error.toString()));
    }
}


export function fetchCredentials(config) {
    return window.fetch(config.SECURITY_URL + '/credentials', {
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
}
