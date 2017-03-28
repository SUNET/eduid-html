
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import { getCredentials, getCredentialsFail,
         stopConfirmationPassword, getPasswordChangeFail } from "actions/Security";



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
              url = chpassURL + '?next=' + nextURL;

        window.location = url;

    } catch(error) {
        yield put(getPasswordChangeFail(error.toString()));
    }
}

