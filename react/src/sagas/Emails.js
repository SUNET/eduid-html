
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import { getEmails, getEmailsFail, postEmailFail } from "actions/Emails";



export function* requestEmails () {
    try {
        yield put(getEmails());
        const config = select(state => state.config);
        yield call(fetchEmails, config);
    } catch(error) {
        yield put(getEmailsFail(error.toString()));
    }
}

function* fetchEmails (config) {
    yield window.fetch(config.EMAILS_URL, {
        credentials: 'include',
        headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(emails => put(emails))
}

export function* saveEmail () {
    try {
        const state = select(state => state),
              data = {
                email: state.emails.email
              };
        yield call(sendEmail, state.config, data);
    } catch(error) {
        yield put(postUserDataFail(error.toString()));
    }
}

function* sendEmail (config, data) {
    yield window.fetch(config.EMAILS_URL, {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(emails => put(emails))
}
