
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import { getEmails, getEmailsFail, postEmailFail } from "actions/Emails";



export function* requestEmails () {
    try {
        yield put(getEmails());
        const config = yield select(state => state.config);
        const emails = yield call(fetchEmails, config);
        yield put(emails);
    } catch(error) {
        yield put(getEmailsFail(error.toString()));
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
                email: state.emails.email
              };
        const emails = yield call(sendEmail, state.config, data);
        yield put(emails);
    } catch(error) {
        yield put(postUserDataFail(error.toString()));
    }
}

function sendEmail (config, data) {
    return window.fetch(config.EMAILS_URL, {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
