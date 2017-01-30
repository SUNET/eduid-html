export const GET_MOBILES = 'GET_MOBILES';
export const GET_MOBILES_SUCCESS = 'GET_MOBILES_SUCCESS';
export const GET_MOBILES_FAIL = 'GET_MOBILES_FAIL';
export const CHANGE_MOBILES = 'CHANGE_MOBILES';
export const POST_MOBILES = 'POST_MOBILES';
export const POST_MOBILES_SUCCESS = 'POST_MOBILES_NEW_SUCCESS';
export const POST_MOBILES_FAIL = 'POST_MOBILES_FAIL';
export const START_CONFIRMATION = 'START_CONFIRMATION';
export const STOP_CONFIRMATION = 'STOP_CONFIRMATION';
export const START_RESEND_MOBILE_CODE = 'START_RESEND_MOBILE_CODE';
export const START_RESEND_MOBILE_CODE_SUCCESS = 'START_RESEND_MOBILE_CODE_SUCCESS';
export const START_RESEND_MOBILE_CODE_FAIL = 'START_RESEND_MOBILE_CODE_FAIL';
export const START_VERIFY = 'START_VERIFY';
export const START_VERIFY_FAIL = 'START_VERIFY_FAIL';
export const POST_MOBILE_REMOVE = 'POST_MOBILE_REMOVE';
export const POST_MOBILE_REMOVE_SUCCESS = 'POST_MOBILE_REMOVE_SUCCESS';
export const POST_MOBILE_REMOVE_FAIL = 'POST_MOBILE_REMOVE_FAIL';
export const POST_MOBILE_PRIMARY = 'POST_MOBILE_PRIMARY'
export const POST_MOBILE_PRIMARY_SUCCESS = 'POST_MOBILE_PRIMARY_SUCCESS'
export const POST_MOBILE_PRIMARY_FAIL = 'POST_MOBILE_PRIMARY_FAIL'

export function getMobiles () {
  return {
    type: GET_MOBILES,
  };
}

export function getMobilesFail (err) {
  return {
    type: GET_MOBILES_FAIL, error: true,
    payload: new Error(err)
  };
}

export function changeMobile (data) {
  return {
    type: CHANGE_MOBILES,
    payload: data
  };
}

export function postMobile () {
  return {
    type: POST_MOBILES
  };
}

export function postMobileFail (err) {
  return {
    type: POST_MOBILES_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function stopConfirmation () {
  return {
    type: STOP_CONFIRMATION
  };
}

export function startConfirmation (data) {
  return {
    type: START_CONFIRMATION,
    payload: data
  };
}
export function startResendMobileCode() {
  return {
    type: START_RESEND_MOBILE_CODE
  };
}

export function resendMobileCodeFail (err) {
  return {
    type: START_RESEND_MOBILE_CODE_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function startVerify (data) {
  return {
    type: START_VERIFY,
    payload: data
  };
}

export function startVerifyFail (err) {
  return {
    type: START_VERIFY_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function startRemove (data) {
  return {
    type: POST_MOBILE_REMOVE,
    payload: data
  };
}

export function startRemoveFail (err) {
  return {
    type: POST_MOBILE_REMOVE_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function makePrimary (data) {
  return {
    type: POST_MOBILE_PRIMARY,
    payload: data
  };
}

export function makePrimaryFail (err) {
  return {
    type: POST_MOBILE_PRIMARY_FAIL,
    error: true,
    payload: new Error(err)
  };
}