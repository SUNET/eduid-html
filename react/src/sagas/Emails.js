
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         postRequest, saveData, notIE11Unauthn } from "actions/common";
import * as actions from "actions/Emails";


const getData = (state) => ({
    email: state.emails.email,
    verified: false,
    primary: false,
    csrf_token: state.config.csrf_token
});

export function sendEmail (config, data) {
    return window.fetch(config.EMAILS_URL + 'new', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export const saveEmail = saveData(getData,
                                  'emails',
                                  (data) => ({type: 'NOOP_ACTION'}),
                                  sendEmail,
                                  actions.postEmailFail)

export function* requestResendEmailCode () {
    try {
        const state = yield select(state => state),
              data = {
                email: state.emails.confirming,
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(requestResend, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        if (notIE11Unauthn(error) === true) {
            yield put(actions.resendEmailCodeFail(error.toString()));
        }
    }
}

export function requestResend (config, data) {
    return window.fetch(config.EMAILS_URL + 'resend-code', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestVerifyEmail () {
    try {
        const state = yield select(state => state),
              data = {
                email: state.emails.confirming,
                code: state.emails.code,
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(requestVerify, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        if (notIE11Unauthn(error) === true) {
            yield put(actions.startVerifyFail(error.toString()));
        }
    }
}

export function requestVerify (config, data) {
    return window.fetch(config.EMAILS_URL + 'verify', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestRemoveEmail () {
    try {
        const state = yield select(state => state),
              data = {
                email: state.emails.email,
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(requestRemove, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        if (notIE11Unauthn(error) === true) {
            yield put(actions.startRemoveFail(error.toString()));
        }
    }
}

export function requestRemove (config, data) {
    return window.fetch(config.EMAILS_URL + 'remove', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestMakePrimaryEmail () {
    try {
        const state = yield select(state => state),
              data = {
                email: state.emails.email,
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(requestMakePrimary, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        if (notIE11Unauthn(error) === true) {
            yield put(actions.makePrimaryFail(error.toString()));
        }
    }
}

export function requestMakePrimary (config, data) {
    return window.fetch(config.EMAILS_URL + 'primary', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
