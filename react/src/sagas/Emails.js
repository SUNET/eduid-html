
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import * as actions from "actions/Emails";



export function* requestEmails () {
    try {
        yield put(actions.getEmails());
        const config = yield select(state => state.config);
        const emails = yield call(fetchEmails, config);
        yield put(emails);
    } catch(error) {
        yield put(actions.getEmailsFail(error.toString()));
    }
}

export function fetchEmails (config) {
    return window.fetch(config.EMAILS_URL + 'all', {
        credentials: 'include',
        headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* saveEmail () {
    try {
        const state = yield select(state => state),
              data = {
                email: state.emails.email,
                verified: false,
                primary: false,
                csrf_token: state.emails.csrf_token
              };
        const emails = yield call(sendEmail, state.config, data);
        yield put(emails);
    } catch(error) {
        yield put(actions.postEmailFail(error.toString()));
    }
}

export function sendEmail (config, data) {
    return window.fetch(config.EMAILS_URL + 'new', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestResendEmailCode () {
    try {
        const state = yield select(state => state),
              data = {
                email: state.emails.confirming,
                csrf_token: state.emails.csrf_token
              };
        const resp = yield call(requestResend, state.config, data);
        yield put(resp);
    } catch(error) {
        yield put(actions.resendEmailCodeFail(error.toString()));
    }
}

export function requestResend (config, data) {
    return window.fetch(config.EMAILS_URL + 'resend-code', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
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
                csrf_token: state.emails.csrf_token
              };
        const resp = yield call(requestVerify, state.config, data);
        yield put(resp);
    } catch(error) {
        yield put(actions.startVerifyFail(error.toString()));
    }
}

export function requestVerify (config, data) {
    return window.fetch(config.EMAILS_URL + 'verify', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
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
                csrf_token: state.emails.csrf_token
              };
        const resp = yield call(requestRemove, state.config, data);
        yield put(resp);
    } catch(error) {
        yield put(actions.startRemoveFail(error.toString()));
    }
}

export function requestRemove (config, data) {
    return window.fetch(config.EMAILS_URL + 'remove', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
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
                csrf_token: state.emails.csrf_token
              };
        const resp = yield call(requestMakePrimary, state.config, data);
        yield put(resp);
    } catch(error) {
        yield put(actions.makePrimaryFail(error.toString()));
    }
}

export function requestMakePrimary (config, data) {
    return window.fetch(config.EMAILS_URL + 'primary', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
