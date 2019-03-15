
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         getRequest, postRequest, failRequest } from "actions/common";
import { getCredentials, getCredentialsFail,
         stopConfirmationPassword, getPasswordChangeFail,
         postConfirmDeletion, accountRemovedFail,
         tokenRemovedFail, registerWebauthnFail,
         beginWebauthnFail,
         GET_WEBAUTHN_BEGIN_SUCCESS,
         GET_WEBAUTHN_BEGIN_FAIL } from "actions/Security";
import { eduidNotify } from "actions/Notifications";
import {tokenVerifyFail} from "../actions/Security";
import * as CBOR from "sagas/cbor";


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
            credential_key: state.security.webauthn_token_remove
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
        console.log('Webauthn begin registration');
        const state = yield select(state => state);
        //if (state.security.webauthn_options.hasOwnProperty('publicKey')) {return}
        const data = {
            csrf_token: state.config.csrf_token,
            authenticator: state.security.webauthn_authenticator,
        };
        const action = yield call(beginWebauthnRegistration, state.config, data);
        if (action.type === GET_WEBAUTHN_BEGIN_SUCCESS)  {
            yield put(putCsrfToken(action));
            if (action.payload.registration_data !== undefined) {
                const attestation = yield call(navigator.credentials.create.bind(navigator.credentials),
                                               action.payload.registration_data);
                action.payload.attestation = attestation;
            } else {
                console.log('No webauthn registration data in the settigns');
            }
        }
        yield put(action);
    } catch(error) {
        console.log('Problem begining webauthn registration', error);
        yield* failRequest(error, registerWebauthnFail);
    }
}


function safeDecodeCBOR (str) {
    const bytes = atob(str.replace(/_/g, '/').replace(/-/g, '+'));
    const buff = Uint8Array.from(bytes, c => c.charCodeAt(0));
    return CBOR.decode(buff.buffer);
}

function safeEncode (obj) {
    const bytesObj = String.fromCharCode.apply(null, new Uint8Array(obj));
    const unsafeObj = btoa(bytesObj);
    return unsafeObj.replace(/\//g, '_').replace(/\+/g, '-').replace(/=*$/, "");
}


export function beginWebauthnRegistration (config, data) {
    return window.fetch(config.SECURITY_URL + 'webauthn/register/begin', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(response => {
        if (response.payload.registration_data !== undefined) {
            response.payload.registration_data = safeDecodeCBOR(response.payload.registration_data);
        }
        console.log('Action config: ', response);    
        return response;
    })
}


export function* registerWebauthn () {
    try {
        const state = yield select(state => state);
        const attestation = state.security.webauthn_attestation,
              data = {
                  csrf_token: state.config.csrf_token,
                  attestationObject: safeEncode(attestation.response.attestationObject),
                  clientDataJSON: safeEncode(attestation.response.clientDataJSON),
                  credentialId:  attestation.id,
                  description:  state.security.webauthn_token_description,
              };
        const result = yield call(webauthnRegistration, state.config, data);
        yield put(putCsrfToken(result));
        yield put(result);
    } catch(error) {
        yield* failRequest(error, registerWebauthnFail);
    }
}

export function webauthnRegistration (config, data) {
    return window.fetch(config.SECURITY_URL + 'webauthn/register/complete', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
