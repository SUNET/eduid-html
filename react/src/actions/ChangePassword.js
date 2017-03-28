

export const GET_SUGGESTED_PASSWORD = 'GET_SUGGESTED_PASSWORD';
export const GET_SUGGESTED_PASSWORD_SUCCESS = 'GET_SECURITY_SUGGESTED_PASSWORD_SUCCESS';
export const GET_SUGGESTED_PASSWORD_FAIL = 'GET_SECURITY_SUGGESTED_PASSWORD_FAIL';


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

