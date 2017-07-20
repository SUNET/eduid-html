
export const GET_NINS = 'GET_NINS';
export const GET_NINS_SUCCESS = 'GET_PERSONAL_DATA_NINS_SUCCESS';
export const GET_NINS_FAIL = 'GET_PERSONAL_DATA_NINS_FAIL';
export const VALID_NIN = 'VALID_NIN';
export const INVALID_NIN = 'INVALID_NIN';
export const POST_NIN_REMOVE = 'POST_NIN_REMOVE'
export const POST_NIN_REMOVE_SUCCESS = 'POST_LETTER_PROOFING_REMOVE_NIN_SUCCESS'
export const POST_NIN_REMOVE_FAIL = 'POST_LETTER_PROOFING_REMOVE_NIN_FAIL'


export function getNins () {
  return {
    type: GET_NINS,
  };
}

export function getNinsFail (err) {
  return {
    type: GET_NINS_FAIL,
    error: true,
    payload: {
      error: new Error(err),
      message: err
    }
  };
}

export function validNin (nin) {
  return {
    type: VALID_NIN,
    payload: {
        nin: nin
    }
  };
}

export function invalidNin () {
  return {
    type: INVALID_NIN,
  };
}

export function startRemove (nin) {
  return {
    type: POST_NIN_REMOVE,
    payload: {
      nin: nin
    }
  };
}

export function startRemoveFail (err) {
  return {
    type: POST_NIN_REMOVE_FAIL,
    error: true,
    payload: new Error(err)
  };
}
