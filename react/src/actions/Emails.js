
export const GET_EMAILS = 'GET_EMAILS';
export const GET_EMAILS_SUCCESS = 'GET_EMAILS_SUCCESS';
export const GET_EMAILS_FAIL = 'GET_EMAILS_FAIL';
export const CHANGE_EMAIL = 'CHANGE_EMAIL';
export const POST_EMAIL = 'POST_EMAIL';
export const POST_EMAIL_SUCCESS = 'POST_EMAIL_SUCCESS';
export const POST_EMAIL_FAIL = 'POST_EMAIL_FAIL';


export function getEmails () {
  return {
    type: GET_EMAILS,
  };
}

export function getEmailsFail (err) {
  return {
    type: GET_EMAILS_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function changeEmail (data) {
  return {
    type: CHANGE_EMAIL,
    payload: data
  };
}

export function postEmail () {
  return {
    type: POST_EMAIL
  };
}

export function postEmailFail (err) {
  return {
    type: POST_EMAIL_FAIL,
    error: true,
    payload: new Error(err)
  };
}

// Async (thunk) action creators

import { checkStatus, ajaxHeaders } from "actions/common";

export function fetchEmails () {
  return function (dispatch, getState) {

    dispatch(getEmails());
    const state = getState();

    window.fetch(state.config.EMAILS_URL, {
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(emails => dispatch(emails))
    .catch(err => {
      console.log('eduID Error (fetching emails)', err);
      dispatch(getEmailsFail(err));
    });
  }
}


export function addEmail () {
  return function (dispatch, getState) {

    dispatch(postEmail());
    let state = getState(),
        data = {
            'email': state.emails.email,
        };

    window.fetch(state.config.EMAILS_URL, {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(userdata => dispatch(userdata))
    .catch(err => {
      console.log('eduID Error (saving personal data)', err);
      dispatch(postUserDataFail(err));
    });
  }
}

