

export const GET_CREDENTIALS = 'GET_CREDENTIALS';
export const GET_CREDENTIALS_SUCCESS = 'GET_SECURITY_USER_SUCCESS';
export const GET_CREDENTIALS_FAIL = 'GET_SECURITY_USER_FAIL';

export const POST_CHANGE_PASSWORD = 'POST_CHANGE_PASSWORD';
export const POST_CHANGE_PASSWORD_SUCCESS = 'POST_CHANGE_PASSWORD_SUCCESS';
export const POST_CHANGE_PASSWORD_FAIL = 'POST_CHANGE_PASSWORD_FAIL';
export const POST_DELETE_ACCOUNT = 'POST_DELETE_ACCOUNT';
export const POST_DELETE_ACCOUNT_SUCCESS = 'POST_DELETE_ACCOUNT_SUCCESS';
export const POST_DELETE_ACCOUNT_FAIL = 'POST_DELETE_ACCOUNT_FAIL';
export const STOP_DELETE_ACCOUNT = 'STOP_DELETE_ACCOUNT';
export const START_DELETE_ACCOUNT = 'START_DELETE_ACCOUNT';
export const START_CHANGE_PASSWORD = 'START_CHANGE_PASSWORD';
export const STOP_CHANGE_PASSWORD = 'STOP_CHANGE_PASSWORD';


export function getCredentials () {
  return {
    type: GET_CREDENTIALS,
  };
}

export function getCredentialsFail (err) {
  return {
    type: GET_CREDENTIALS_FAIL,
    error: true,
    payload: new Error(err)
  };
}


export function startConfirmationPassword (data) {
  return {
    type: START_CHANGE_PASSWORD,
    payload: data
  };
}

export function stopConfirmationPassword () {
  return {
    type: STOP_CHANGE_PASSWORD
  };
}

export function changepassword (data) {
  return {
    type: POST_CHANGE_PASSWORD,
    payload: data
  };
}

export function changepasswordFail (err) {
  return {
    type: POST_CHANGE_PASSWORD_FAIL,
    error: true,
    payload: {
      error: new Error(err),
      message: err
    }
  };
}

export function startConfirmation (data) {
  return {
    type: START_DELETE_ACCOUNT,
    payload: data
  };
}

export function stopConfirmation () {
  return {
    type: STOP_DELETE_ACCOUNT
  };
}

export function removeAccount (data) {
  return {
    type: POST_DELETE_ACCOUNT,
    payload: data

  };
}

export function removeAccountFail (err) {
  return {
    type: POST_DELETE_ACCOUNT_FAIL,
    error: true,
    payload: {
      error: new Error(err),
      message: err
    }
  };
}