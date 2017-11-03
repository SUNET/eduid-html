
import { put, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         postRequest } from "actions/common";
import { postLogoutFail } from "actions/Header";


export function* requestLogout () {
    try {
        const state = yield select(state => state),
              data = {
                csrf_token: state.config.csrf_token
              },
              authn_url = state.config.TOKEN_SERVICE_URL;
        const resp = yield call(sendLogout, authn_url, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        console.log('Error performing logout: ' + error.toString());
        yield put(postLogoutFail(error.toString()));
    }
}

export function sendLogout (url, data) {
    return window.fetch(url + '/logout', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
