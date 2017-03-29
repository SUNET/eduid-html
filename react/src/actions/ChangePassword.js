

export const GET_SUGGESTED_PASSWORD = 'GET_SUGGESTED_PASSWORD';
export const GET_SUGGESTED_PASSWORD_SUCCESS = 'GET_SECURITY_SUGGESTED_PASSWORD_SUCCESS';
export const GET_SUGGESTED_PASSWORD_FAIL = 'GET_SECURITY_SUGGESTED_PASSWORD_FAIL';

export const CHOOSE_CUSTOM_PASSWORD = 'CHOOSE_CUSTOM_PASSWORD';
export const CHOOSE_SUGGESTED_PASSWORD = 'CHOOSE_SUGGESTED_PASSWORD';


export function getSuggestedPassword () {
  return {
    type: GET_SUGGESTED_PASSWORD,
  };
}

export function getSuggestedPasswordFail (err) {
  return {
    type: GET_SUGGESTED_PASSWORD_FAIL,
    error: true,
    payload: new Error(err)
  };
}


export function chooseSuggestedPassword () {
  return {
    type: CHOOSE_SUGGESTED_PASSWORD,
  };
}


export function chooseCustomPassword () {
  return {
    type: CHOOSE_CUSTOM_PASSWORD,
  };
}

