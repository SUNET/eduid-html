
export const POST_OPENID = 'POST_OPENID';
export const POST_OPENID_SUCCESS = 'POST_OPENID_SUCCESS';
export const POST_OPENID_FAIL = 'POST_OPENID_FAIL';


export function postOpenid () {
  return {
    type: POST_OPENID
  };
}

export function postOpenidFail (err) {
  return {
    type: POST_OPENID_FAIL,
    error: true,
    payload: new Error(err)
  };
}

// Async (thunk) action creators

import { checkStatus } from "actions/common";

export function fetchOpenidQRCode () {
  return function (dispatch, getState) {
    dispatch(postOpenid());

    let state = getState(),
        data = {
            'nin': document.getElementById('nin-input').value
        }

    // XXX take url from congfig
    window.fetch('/openid/get-qrcode', {
      // To automatically send cookies only for the current domain,
      // set credentials to 'same-origin'; use 'include' for CORS
      credentials: 'include',
      method: 'post',
      headers: {
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
        "Pragma": "no-cache"
      },
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(openiddata => dispatch(openiddata))
    .catch(err => {
      console.log('eduID Error (fetching openid data)', err);
      dispatch(postOpenidFail(err));
    });
  }
}
