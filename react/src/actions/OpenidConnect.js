
import React from 'react';
import { FormattedMessage } from 'react-intl';
import init_app from "../init-app";

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
    payload: {
      error: err,
      message: err
    }
  };
}

// Async (thunk) action creators

import { checkStatus } from "actions/common";

export function fetchOpenidQRCode () {
  return (dispatch, getState) => {
    dispatch(postOpenid());

    const error_msg = "",
          state = getState(),
          input = document.querySelector('input[name=norEduPersonNIN]'),
          nin = input ? (input.value || 'no nin') : 'testing',
          data = {
            'nin': nin
          },
          url = state.config.OIDC_PROOFING_URL;

    console.log('Getting QRCode for NIN: ' + nin);

    if (nin === 'no nin') {
      dispatch(postOpenidFail('Error: No NIN entered'));
      return;
    }
    
    let promise = window.fetch( url, {
      // To automatically send cookies only for the current domain,
      // set credentials to 'same-origin'; use 'include' for CORS
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
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
      console.log('eduID Error fetching openid data from ' + url, err.toString());
      dispatch(postOpenidFail(err.toString()));
    });
    return promise;
  }
}
