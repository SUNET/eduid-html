
export const GET_CONFIG = 'GET_CONFIG';
export const GET_CONFIG_SUCCESS = 'GET_CONFIG_SUCCESS';
export const GET_CONFIG_FAIL = 'GET_CONFIG_FAIL';


export function getConfig () {
  return {
    type: GET_CONFIG
  };
}


export function getConfigSuccess (config) {
  return {
    type: GET_CONFIG_SUCCESS,
    payload: config
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

let checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

export function fetchConfig () {
  return function (dispatch) {
    dispatch(getConfig());

    window.fetch('/personal-data/config', {
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
    .then(config => dispatch(getConfigSuccess(config)))
    .catch(err => dispatch(getConfigFail(err)))
  }
}
