
export const START_LETTER_PROOFING = 'START_LETTER_PROOFING';
export const STOP_LETTER_PROOFING = 'STOP_LETTER_PROOFING';
export const POST_LETTER_PROOFING_PROOFING = 'POST_LETTER_PROOFING_PROOFING';
export const POST_LETTER_PROOFING_CODE = 'POST_LETTER_PROOFING_CODE';
export const WAIT_LETTER_PROOFING_PROOFING = 'WAIT_LETTER_PROOFING_PROOFING';
export const POST_LETTER_PROOFING_PROOFING_SUCCESS = 'POST_LETTER_PROOFING_PROOFING_SUCCESS';
export const POST_LETTER_PROOFING_PROOFING_FAIL = 'POST_LETTER_PROOFING_PROOFING_FAIL';
export const POST_LETTER_PROOFING_CODE_FAIL = 'POST_LETTER_PROOFING_CODE_FAIL';


export function stopPostLetterProofing () {
  return {
    type: STOP_LETTER_PROOFING
  };
}

export function startPostLetterProofing () {
  return {
    type: START_LETTER_PROOFING
  };
}

export function postSendLetterProofing () {
  return {
    type: POST_LETTER_PROOFING_CODE
  };
}

export function postLetterProofing (code) {
  return {
    type: POST_LETTER_PROOFING_PROOFING,
    payload: {
        code: code
    }
  };
}

export function waitLetterProofing () {
  return {
    type: WAIT_LETTER_PROOFING_PROOFING
  };
}

export function postLetterProofingFail (err) {
  return {
    type: POST_LETTER_PROOFING_PROOFING_FAIL,
    error: true,
    payload: {
      error: err,
      message: err.toString()
    }
  };
}

export function postLetterCodeFail (err) {
  return {
    type: POST_LETTER_PROOFING_CODE_FAIL,
    error: true,
    payload: {
      error: err,
      message: err.toString()
    }
  };
}
