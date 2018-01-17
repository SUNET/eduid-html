
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         getRequest, postRequest, failRequest } from "actions/common";
import { getCredentials, getCredentialsFail,
         stopConfirmationPassword, getPasswordChangeFail,
         postConfirmDeletion, accountRemovedFail  } from "actions/Security";



export function* requestCredentials () {
    try {
        yield put(getCredentials());
        const config = yield select(state => state.config);
        const credentials = yield call(fetchCredentials, config);
        yield put(putCsrfToken(credentials));
        yield put(credentials);
    } catch(error) {
        yield* failRequest(error, getCredentialsFail);
    }
}


export function fetchCredentials(config) {
    return window.fetch(config.SECURITY_URL + 'credentials', {
        ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}


export function* requestPasswordChange (win) {
    try {
        yield put(stopConfirmationPassword());
        const config = yield select(state => state.config),
              tsURL = config.TOKEN_SERVICE_URL,
              chpassURL = tsURL + 'chpass',
              dashURL = config.DASHBOARD_URL,
              nextURL = dashURL + 'chpass',
              url = chpassURL + '?next=' + encodeURIComponent(nextURL);

        if (win !== undefined && win.location !== undefined) {
            win.location.href = url;
        } else {
            window.location.href = url;
        }

    } catch(error) {
        yield* failRequest(error, getPasswordChangeFail);
    }
}


export function* postDeleteAccount () {
    try {
        yield put(postConfirmDeletion());
        const state = yield select(state => state);
        const data = {
            csrf_token: state.config.csrf_token
        };
        const resp = yield call(deleteAccount, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield* failRequest(error, accountRemovedFail);
    }
}


export function deleteAccount(config, data) {
    return window.fetch(config.SECURITY_URL + 'terminate-account', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
