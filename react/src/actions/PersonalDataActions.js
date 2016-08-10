
export const SAVE_USERDATA = 'SAVE_USERDATA';
export const GET_USERDATA = 'GET_USERDATA';
export const GET_USERDATA_SUCCESS = 'GET_USERDATA_SUCCESS';
export const GET_USERDATA_FAIL = 'GET_USERDATA_FAIL';
export const POST_USERDATA = 'POST_USERDATA';
export const POST_USERDATA_SUCCESS = 'POST_USERDATA_SUCCESS';
export const POST_USERDATA_FAIL = 'POST_USERDATA_FAIL';


export function saveUserdata (data) {
  return {
    type: SAVE_USERDATA,
    payload: data
  };
}

export function getUserdata () {
  return {
    type: GET_USERDATA,
  };
}

export function getUserdataSuccess (data) {
  return {
    type: GET_USERDATA_SUCCESS,
    payload: data
  };
}

export function getUserdataFail (err) {
  return {
    type: GET_USERDATA_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function postUserdata () {
  return {
    type: POST_USERDATA,
  };
}

export function postUserdataSucess () {
  return {
    type: POST_USERDATA_SUCCESS,
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

import { checkStatus } from "actions/common";

export function fetchPersonalData () {
  return function (dispatch) {
    dispatch(getUserdata());

    // XXX take url from congfig
    window.fetch('/personal-data/user', {
      // To automatically send cookies only for the current domain,
      // set credentials to 'same-origin'; use 'include' for CORS
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
        "Pragma": "no-cache"
      }
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(userdata => dispatch(getUserdataSuccess(userdata)))
    .catch(err => {
      console.log('eduID Error (fetching personal data)', err);
      dispatch(getUserDataFail(err));
    });
  }
}
