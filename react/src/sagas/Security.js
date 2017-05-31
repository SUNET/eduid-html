
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import { getCredentials, getCredentialsFail,
         stopConfirmationPassword, getPasswordChangeFail,
         postConfirmDeletion, removeAccountFail  } from "actions/Security";



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


export function* requestPasswordChange () {
    try {
        yield put(stopConfirmationPassword());
        const config = yield select(state => state.config),
              tsURL = config.TOKEN_SERVICE_URL,
              chpassURL = tsURL + '/chpass',
              dashURL = config.DASHBOARD_URL,
              nextURL = dashURL + '/#chpass',
              url = chpassURL + '?next=' + encodeURIComponent(nextURL);

        window.location = url;

    } catch(error) {
        yield put(getPasswordChangeFail(error.toString()));
    }
}


export function* postDeleteAccount () {
    try {
        yield put(postConfirmDeletion());
        const state = yield select(state => state);
        const data = {
            csrf_token: state.security.csrf_token
        };
        debugger;
        const resp = yield call(deleteAccount, state.config, data);
        yield put(resp);
    } catch(error) {
        yield put(removeAccountFail(error.toString()));
    }
}


export function deleteAccount(config, data) {
    debugger;
    return window.fetch(config.SECURITY_URL + '/terminate-account', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
