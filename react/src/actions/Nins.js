export const POST_MOBILE_SUSCRIPTION = 'POST_MOBILE_SUSCRIPTION';
export const POST_MOBILE_SUSCRIPTION_SUCCESS = 'POST_MOBILE_SUSCRIPTION_SUCCESS';
export const POST_MOBILE_SUSCRIPTION_FAIL = 'POST_MOBILE_SUSCRIPTION_FAIL';
export const POST_LETTER = 'POST_LETTER';
export const POST_LETTER_SUCCESS = 'POST_LETTER_SUCCESS';
export const POST_LETTER_FAIL = 'POST_LETTER_FAIL';

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
      error: err,
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
      error: err,
      message: err
    }
  };
}
