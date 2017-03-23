export const GET_NIN_STATE = 'GET_NIN_STATE';
export const GET_NIN_STATE_FAIL = 'GET_NIN_STATE_FAIL';
export const POST_MOBILE_SUSCRIPTION = 'POST_MOBILE_SUSCRIPTION';
export const POST_MOBILE_SUSCRIPTION_SUCCESS = 'POST_MOBILE_SUSCRIPTION_SUCCESS';
export const POST_MOBILE_SUSCRIPTION_FAIL = 'POST_MOBILE_SUSCRIPTION_FAIL';
export const POST_LETTER = 'POST_LETTER';
export const POST_LETTER_SUCCESS = 'POST_LETTER_SUCCESS';
export const POST_LETTER_FAIL = 'POST_LETTER_PROOFING_PROOFING_FAIL';
export const GET_LETTER_PROOFING_PROOFING_SUCCESS = 'GET_LETTER_PROOFING_PROOFING_SUCCESS';
export const VERIFY_LETTER_CODE = 'POST_LETTER_PROOFING_VERIFY_CODE';
export const VERIFY_LETTER_CODE_FAIL = 'POST_LETTER_PROOFING_VERIFY_CODE_FAIL';
export const VERIFY_LETTER_CODE_SUCCESS = 'POST_LETTER_PROOFING_VERIFY_CODE_SUCCESS';
export const START_CODE_VERIFY = 'START_CODE_VERIFY';
export const START_CODE_VERIFY_FAIL = 'START_CODE_VERIFY_FAIL';
export const STOP_CODE_VERIFY = 'STOP_CODE_VERIFY';

export function getNinState () {
  return {
    type: GET_NIN_STATE,
  };
}

export function getNinStateFail (err) {
  return {
    type: GET_NIN_STATE_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function postmobilesuscription (data) {
  return {
    type: POST_MOBILE_SUSCRIPTION,
    payload: data
  };
}

export function postmobilesuscriptionFail (err) {
  return {
    type: POST_MOBILE_SUSCRIPTION_FAIL,
    error: true,
    payload: {
      error: new Error(err),
      message: err
    }
  };
}

export function postLetter (data) {
  return {
    type: POST_LETTER,
    payload: data

  };
}

export function postLetterFail (err) {
  return {
    type: POST_LETTER_FAIL,
    error: true,
    payload: {
      error: new Error(err),
      message: err
    }
  };
}

export function verifyLetterCode (data) {
  return {
    type: VERIFY_LETTER_CODE,
    payload: data

  };
}

export function verifyLetterCodeFail (err) {
  return {
    type: VERIFY_LETTER_CODE_FAIL,
    error: true,
    payload: {
      error: new Error(err),
      message: err
    }
  };
}

export function startVerify () {
  return {
    type: START_CODE_VERIFY,
  };
}

export function startVerifyFail (err) {
  return {
    type: START_CODE_VERIFY_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function stopVerify () {
  return {
    type: STOP_CODE_VERIFY,
  };
}
