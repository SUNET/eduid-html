
import { checkStatus } from "actions/common";
import { fetchUserdata } from "actions/PersonalData";

export const GET_CONFIG = 'GET_CONFIG';
export const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS';
export const GET_CONFIG_FAIL = 'GET_CONFIG_FAIL';


export function getConfig () {
  return {
    type: GET_CONFIG
  };
}


export function getConfigFail (err) {
  return {
    type: GET_CONFIG_FAIL,
    error: true,
    payload: new Error(err)
  };
}


// Async (thunk) action creators

const initApp = (dispatch) => {
  dispatch(fetchUserdata());
};

export function fetchConfig () {
  return dispatch => {
    dispatch(getConfig());

    window.fetch('/jsconfig/get-config', {
      // To automatically send cookies for the current domain,
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
    .then(config => dispatch(config))
    .then(() => initApp(dispatch))
    .catch(err => {
      console.log('eduID Error (fetching config data)', err);
      dispatch(getConfigFail(err));
    });
  }
}
