
import React from 'react';
import { FormattedMessage } from 'react-intl';
import init_app from "../init-app";

export const POST_OIDC_PROOFING_PROOFING = 'POST_OIDC_PROOFING_PROOFING';
export const POST_OIDC_PROOFING_PROOFING_SUCCESS = 'POST_OIDC_PROOFING_PROOFING_SUCCESS';
export const POST_OIDC_PROOFING_PROOFING_FAIL = 'POST_OIDC_PROOFING_PROOFING_FAIL';


export function postOpenid () {
  return {
    type: POST_OIDC_PROOFING_PROOFING
  };
}

export function postOpenidFail (err) {
  return {
    type: POST_OIDC_PROOFING_PROOFING_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

// Async (thunk) action creators

import { checkStatus, ajaxHeaders } from "actions/common";

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
      headers: ajaxHeaders,
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
