
import { put, select, call } from "redux-saga/effects";
import { register } from 'u2f-api'
import { checkStatus, ajaxHeaders, putCsrfToken,
         getRequest, postRequest, failRequest } from "actions/common";
import { getCredentials, getCredentialsFail,
         stopConfirmationPassword, getPasswordChangeFail,
         postConfirmDeletion, accountRemovedFail,
         enrollU2FFail, stopU2fRegistration, registerU2FFail } from "actions/Security";



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


export function* getU2FEnroll () {
    try {
        const state = yield select(state => state);
        const resp = yield call(enrollU2F, state.config);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield* failRequest(error, enrollU2FFail);
    }
}


export function enrollU2F(config) {
    return window.fetch(config.SECURITY_URL + 'u2f/enroll', {
        ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}


export function* registerU2F () {
    try {
        const state = yield select(state => state);
        const resp = yield call(register, state.security.u2f_request.registerRequests);
        if(resp.errorCode) {
          switch (resp.errorCode) {
            case 1:
              put(eduidNotify('security.u2f_registration_error_unknown', 'errors'));
              break;
            case 2:
              put(eduidNotify('security.u2f_registration_error_bad', 'errors'));
              break;
            case 3:
              put(eduidNotify('security.u2f_registration_error_unsupported', 'errors'));
              break;
            case 4:
              put(eduidNotify('security.u2f_registration_error_device', 'errors'));
              break;
            case 5:
              put(eduidNotify('security.u2f_registration_error_timeout', 'errors'));
              break;
            default:
              put(eduidNotify('security.u2f_registration_error_code', 'errors', {errorCode: resp.errorCode}));
          }
        } else {
            const data = {
                csrf_token: state.config.csrf_token,
                registrationData: resp.registrationData,
                clientData: resp.clientData,
                version: 'U2F_V2'
            };
            const resp2 = yield call(postU2FToken, state.config, data);
            yield put(putCsrfToken(resp2));
            yield put(resp2);
        }
        yield put(stopU2fRegistration());
    } catch(error) {
        yield* failRequest(error, registerU2FFail);
    }
}

export function postU2FToken (config, data) {
    return window.fetch(config.SECURITY_URL + 'u2f/bind', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
