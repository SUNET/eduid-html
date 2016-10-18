
import { checkStatus, ajaxHeaders } from "actions/common";
import { fetchUserdata } from "actions/PersonalData";

export const GET_JSCONFIG_CONFIG = 'GET_JSCONFIG_CONFIG';
export const GET_JSCONFIG_CONFIG_SUCCESS = 'GET_JSCONFIG_CONFIG_SUCCESS';
export const GET_JSCONFIG_CONFIG_FAIL = 'GET_JSCONFIG_CONFIG_FAIL';


export function getConfig () {
  return {
    type: GET_JSCONFIG_CONFIG
  };
}


export function getConfigFail (err) {
  return {
    type: GET_JSCONFIG_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}


// Async (thunk) action creators

export function fetchConfig () {
  return dispatch => {
    dispatch(getConfig());

    return window.fetch('/jsconfig/config', {
      // To automatically send cookies for the current domain,
      // set credentials to 'same-origin'; use 'include' for CORS
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(config => dispatch(config))
    .catch(err => {
      console.log('eduID Error (fetching config data)', err);
      dispatch(getConfigFail(err.toString()));
    })
  }
}
