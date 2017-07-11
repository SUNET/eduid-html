
export const POST_LETTER_PROOFING_PROOFING = 'POST_LETTER_PROOFING_PROOFING';
export const POST_LETTER_PROOFING_PROOFING_SUCCESS = 'POST_LETTER_PROOFING_PROOFING_SUCCESS';
export const POST_LETTER_PROOFING_PROOFING_FAIL = 'POST_LETTER_PROOFING_PROOFING_FAIL';


export function postLetterProofing () {
  return {
    type: POST_LETTER_PROOFING_PROOFING
  };
}

export function postLetterProofingFail (err) {
  return {
    type: POST_LETTER_PROOFING_PROOFING_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}
