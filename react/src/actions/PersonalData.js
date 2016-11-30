
export const GET_USERDATA = 'GET_USERDATA';
export const GET_USERDATA_SUCCESS = 'GET_PERSONAL_DATA_SERVICES_PERSONAL_DATA_USER_SUCCESS';
export const GET_USERDATA_FAIL = 'GET_USERDATA_FAIL';
export const CHANGE_USERDATA = 'CHANGE_USERDATA';
export const POST_USERDATA = 'POST_USERDATA';
export const POST_USERDATA_SUCCESS = 'POST_USERDATA_SUCCESS';
export const POST_USERDATA_FAIL = 'POST_USERDATA_FAIL';


export function getUserdata () {
  return {
    type: GET_USERDATA,
  };
}

export function getUserdataFail (err) {
  return {
    type: GET_USERDATA_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function changeUserdata (data) {
  return {
    type: CHANGE_USERDATA,
    payload: data
  };
}

export function postUserdata () {
  return {
    type: POST_USERDATA
  };
}

export function postUserdataFail (err) {
  return {
    type: POST_USERDATA_FAIL,
    error: true,
    payload: new Error(err)
  };
}

// Async (thunk) action creators

import { checkStatus, ajaxHeaders } from "actions/common";

export function fetchUserdata () {
  return function (dispatch, getState) {
    dispatch(getUserdata());
     let state = getState(),
         url = state.config.PERSONAL_DATA_URL;
    // XXX take url from congfig
     let promise = window.fetch(url, {
      // To automatically send cookies only for the current domain,
      // set credentials to 'same-origin'; use 'include' for CORS
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(userdata => dispatch(userdata))
    .catch(err => {
      console.log('eduID Error (fetching personal data)', err);
      dispatch(getUserdataFail(err));
    });

    return promise;

  }
}


export function saveUserdata () {
  return function (dispatch, getState) {

    dispatch(postUserdata());
    let state = getState(),
        data = {
            'given_name': state.personal_data.given_name,
            'surname': state.personal_data.surname,
            'display_name': state.personal_data.display_name,
            'language': state.personal_data.language
        },
        url = state.config.PERSONAL_DATA_URL;

    let promise = window.fetch(url, {
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
      dispatch(postUserdataFail(err));
    });

    return promise;

  }
}
