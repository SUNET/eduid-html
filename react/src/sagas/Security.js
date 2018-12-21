
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         getRequest, postRequest, failRequest } from "actions/common";
import { getCredentials, getCredentialsFail,
         stopConfirmationPassword, getPasswordChangeFail,
         postConfirmDeletion, accountRemovedFail,
         tokenRemovedFail, registerWebauthnFail,
         GET_WEBAUTHN_BEGIN_SUCCESS } from "actions/Security";
import { eduidNotify } from "actions/Notifications";
import {tokenVerifyFail} from "../actions/Security";



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


export function* removeWebauthnToken () {
    try {
        const state = yield select(state => state);
        const data = {
            csrf_token: state.config.csrf_token,
            keyHandle: state.security.webauthn_token_remove
        };
        const resp = yield call(removeToken, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield* failRequest(error, tokenRemovedFail);
    }
}


export function removeToken(config, data) {
    return window.fetch(config.SECURITY_URL + 'webauthn/remove', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* verifyWebauthnToken (win) {
    try {
        const state = yield select(state => state);
        const keyHandle = state.security.webauthn_token_verify;

        let idpParam = '?idp=' + state.config.TOKEN_VERIFY_IDP;
        let url = state.config.EIDAS_URL + 'verify-token/' + keyHandle + idpParam;

        if (win !== undefined && win.location !== undefined) {
            win.location.href = url;
        } else {
            window.location.href = url;
        }

    } catch(error) {
        yield* failRequest(error, tokenVerifyFail);
    }
}


export function* beginRegisterWebauthn () {
    try {
        const state = yield select(state => state);
        const result = yield call(beginWebauthnRegistration, state.config);
        yield put(result);
    } catch(error) {
        yield* failRequest(error, registerWebauthnFail);
    }
}

export function beginWebauthnRegistration (config) {
    return window.fetch(config.SECURITY_URL + 'register/begin', {
        ...postRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}


export function* registerWebauthn () {
    try {
        const state = yield select(state => state);
        const attestation = yield call(navigator.credentials.create, state.security.webauthn_options);
        const data = {
            attestationObject: btoa(String.fromCharCode.apply(null, new Uint8Array(attestation.response.attestationObject))),
            clientDataJSON: btoa(String.fromCharCode.apply(null, new Uint8Array(attestation.response.clientDataJSON)))
        }
        const result = yield call(webauthnRegistration, state.config, data);
        yield put(result);
    } catch(error) {
        yield* failRequest(error, registerWebauthnFail);
    }
}

export function webauthnRegistration (config, data) {
    return window.fetch(config.SECURITY_URL + 'register/complete', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
