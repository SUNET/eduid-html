

export const GET_SUGGESTED_PASSWORD = 'GET_SUGGESTED_PASSWORD';
export const GET_SUGGESTED_PASSWORD_SUCCESS = 'GET_SECURITY_SUGGESTED_PASSWORD_SUCCESS';
export const GET_SUGGESTED_PASSWORD_FAIL = 'GET_SECURITY_SUGGESTED_PASSWORD_FAIL';

export const CHOOSE_CUSTOM_PASSWORD = 'CHOOSE_CUSTOM_PASSWORD';
export const CHOOSE_SUGGESTED_PASSWORD = 'CHOOSE_SUGGESTED_PASSWORD';

export const POST_PASSWORD_CHANGE = 'POST_PASSWORD_CHANGE';
export const PASSWORD_NOT_READY = 'PASSWORD_NOT_READY';
export const VALID_CUSTOM_PASSWORD = 'VALID_CUSTOM_PASSWORD';
export const START_PASSWORD_CHANGE = 'START_PASSWORD_CHANGE';
export const POST_SECURITY_CHANGE_PASSWORD_SUCCESS = 'POST_SECURITY_CHANGE_PASSWORD_SUCCESS';
export const POST_SECURITY_CHANGE_PASSWORD_FAIL = 'POST_SECURITY_CHANGE_PASSWORD_FAIL';


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


export function chooseSuggestedPassword (pw) {
  return {
    type: CHOOSE_SUGGESTED_PASSWORD,
    payload: pw
  };
}


export function chooseCustomPassword () {
  return {
    type: CHOOSE_CUSTOM_PASSWORD,
  };
}


export function validCustomPassword (pw) {
  return {
    type: VALID_CUSTOM_PASSWORD,
    payload: pw
  };
}


export function passwordNotReady (msg) {
  return {
    type: PASSWORD_NOT_READY,
    error: true,
    payload: msg
  };
}


export function postPasswordChange (oldPassword, newPassword) {
  return {
    type: POST_PASSWORD_CHANGE,
    payload: {
      old: oldPassword,
      next: newPassword
    }
  };
}


export function startPasswordChange () {
  return {
    type: START_PASSWORD_CHANGE,
  };
}

export function postPasswordChangeFail (err) {
  return {
    type: POST_SECURITY_CHANGE_PASSWORD_FAIL,
    error: true,
    payload: new Error(err)
  };
}

