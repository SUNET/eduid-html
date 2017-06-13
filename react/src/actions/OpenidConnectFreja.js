
export const GET_OIDC_PROOFING_FREJA_PROOFING = 'GET_OIDC_PROOFING_FREJA_PROOFING';
export const GET_OIDC_PROOFING_FREJA_PROOFING_SUCCESS = 'GET_OIDC_PROOFING_FREJA_PROOFING_SUCCESS';
export const GET_OIDC_PROOFING_FREJA_PROOFING_FAIL = 'GET_OIDC_PROOFING_FREJA_PROOFING_FAIL';

export const POST_OIDC_PROOFING_FREJA_PROOFING = 'POST_OIDC_PROOFING_FREJA_PROOFING';
export const POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS = 'POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS';
export const POST_OIDC_PROOFING_FREJA_PROOFING_FAIL = 'POST_OIDC_PROOFING_FREJA_PROOFING_FAIL';


export function getOpenidFreja () {
  return {
    type: GET_OIDC_PROOFING_FREJA_PROOFING
  };
}

export function postOpenidFreja () {
  return {
    type: POST_OIDC_PROOFING_FREJA_PROOFING
  };
}

export function getOpenidFrejaFail (err) {
  return {
    type: GET_OIDC_PROOFING_FREJA_PROOFING_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

export function postOpenidFrejaFail (err) {
  return {
    type: POST_OIDC_PROOFING_FREJA_PROOFING_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}
