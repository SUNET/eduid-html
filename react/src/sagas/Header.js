
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         postRequest, failRequest } from "actions/common";
import { postLogoutFail, POST_AUTHN_LOGOUT_SUCCESS } from "actions/Header";


export function* requestLogout () {
    try {
        const state = yield select(state => state),
              url = state.config.TOKEN_SERVICE_URL;
        window.fetch(url + 'logout', {
            method: 'get',
            credentials: 'same-origin',
            mode: 'no-cors',
            redirect: 'manual'
        })
        .then(resp => {
            const win = resp.testingWindow || window;
            win.location = resp.url;
        });
    } catch(error) {
        yield* failRequest(error, postLogoutFail);
    }
}
