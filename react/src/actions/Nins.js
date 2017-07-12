

export const GET_NINS = 'GET_NINS';
export const GET_NINS_SUCCESS = 'GET_PERSONAL_DATA_NINS_SUCCESS';
export const GET_NINS_FAIL = 'GET_PERSONAL_DATA_NINS_FAIL';
export const VALID_NIN = 'VALID_NIN';
export const INVALID_NIN = 'INVALID_NIN';


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
