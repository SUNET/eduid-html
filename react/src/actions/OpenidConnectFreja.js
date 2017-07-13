
export const GET_OIDC_PROOFING_FREJA_PROOFING = 'GET_OIDC_PROOFING_FREJA_PROOFING';
export const GET_OIDC_PROOFING_FREJA_PROOFING_SUCCESS = 'GET_OIDC_PROOFING_FREJA_PROOFING_SUCCESS';
export const GET_OIDC_PROOFING_FREJA_PROOFING_FAIL = 'GET_OIDC_PROOFING_FREJA_PROOFING_FAIL';

export const POST_OIDC_PROOFING_FREJA_PROOFING = 'POST_OIDC_PROOFING_FREJA_PROOFING';
export const POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS = 'POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS';
export const POST_OIDC_PROOFING_FREJA_PROOFING_FAIL = 'POST_OIDC_PROOFING_FREJA_PROOFING_FAIL';

export const SHOW_OIDC_FREJA_MODAL = 'SHOW_OIDC_FREJA_MODAL';
export const SHOW_OIDC_FREJA_MODAL_SUCCESS = 'SHOW_OIDC_FREJA_MODAL_SUCCESS';
export const SHOW_OIDC_FREJA_MODAL_FAIL = 'SHOW_OIDC_FREJA_MODAL_FAIL';
export const HIDE_OIDC_FREJA_MODAL = 'HIDE_OIDC_FREJA_MODAL';


export function getOpenidFreja () {
  return {
    type: GET_OIDC_PROOFING_FREJA_PROOFING
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

export function postOpenidFreja () {
  return {
    type: POST_OIDC_PROOFING_FREJA_PROOFING
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

export function showOpenidFrejaModal () {
    return {
      type: SHOW_OIDC_FREJA_MODAL,
  };
}

export function showOpenidFrejaModalSuccess (nin) {
    return {
      type: SHOW_OIDC_FREJA_MODAL_SUCCESS,
      payload: {
        nin: nin,
      }
  };
}

export function showOpenidFrejaModalFail (err) {
  return {
    type: SHOW_OIDC_FREJA_MODAL_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

export function hideOpenidFrejaModal () {
    return {
      type: HIDE_OIDC_FREJA_MODAL
  };
}