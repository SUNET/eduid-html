
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

function fetchEmails (config) {
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
                confirmed: false,
                primary: false
              };
        const emails = yield call(sendEmail, state.config, data);
        yield put(emails);
    } catch(error) {
        yield put(actions.postEmailFail(error.toString()));
    }
}

function sendEmail (config, data) {
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
                email: state.emails.confirming
              };
        const resp = yield call(requestResend, state.config, data);
        yield put(resp);
    } catch(error) {
        yield put(actions.resendEmailCodeFail(error.toString()));
    }
}

function requestResend (config, data) {
    return window.fetch(config.EMAILS_URL + 'resend-code', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
