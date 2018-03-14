

export const GET_CREDENTIALS = 'GET_CREDENTIALS';
export const GET_CREDENTIALS_SUCCESS = 'GET_SECURITY_CREDENTIALS_SUCCESS';
export const GET_CREDENTIALS_FAIL = 'GET_SECURITY_CREDENTIALS_FAIL';

export const GET_CHANGE_PASSWORD = 'GET_CHANGE_PASSWORD';
export const GET_CHANGE_PASSWORD_SUCCESS = 'GET_CHANGE_PASSWORD_SUCCESS';
export const GET_CHANGE_PASSWORD_FAIL = 'GET_CHANGE_PASSWORD_FAIL';
export const START_CHANGE_PASSWORD = 'START_CHANGE_PASSWORD';
export const STOP_CHANGE_PASSWORD = 'STOP_CHANGE_PASSWORD';

export const START_DELETE_ACCOUNT = 'START_DELETE_ACCOUNT';
export const STOP_DELETE_ACCOUNT = 'STOP_DELETE_ACCOUNT';
export const POST_DELETE_ACCOUNT = 'POST_DELETE_ACCOUNT';
export const SEND_POST_DELETE_ACCOUNT = 'SEND_POST_DELETE_ACCOUNT';
export const POST_DELETE_ACCOUNT_SUCCESS = 'POST_SECURITY_TERMINATE_ACCOUNT_SUCCESS';
export const POST_DELETE_ACCOUNT_FAIL = 'POST_SECURITY_TERMINATE_ACCOUNT_FAIL';
export const GET_DELETE_ACCOUNT = 'GET_SECURITY_ACCOUNT_TERMINATED';
export const GET_DELETE_ACCOUNT_SUCCESS = 'GET_SECURITY_ACCOUNT_TERMINATED_SUCCESS';
export const GET_DELETE_ACCOUNT_FAIL = 'GET_SECURITY_ACCOUNT_TERMINATED_FAIL';
export const START_U2F_REGISTRATION = 'START_U2F_REGISTRATION';
export const STOP_U2F_REGISTRATION = 'STOP_U2F_REGISTRATION';


export function getCredentials () {
  return {
    type: GET_CREDENTIALS,
  };
}

export function getCredentialsFail (err) {
  return {
    type: GET_CREDENTIALS_FAIL,
    error: true,
    payload: {
      error: new Error(err),
      message: err
    }
  };
}


export function startConfirmationPassword () {
  return {
    type: START_CHANGE_PASSWORD,
  };
}

export function stopConfirmationPassword () {
  return {
    type: STOP_CHANGE_PASSWORD
  };
}

export function confirmPasswordChange () {
  return {
    type: GET_CHANGE_PASSWORD
  };
}

export function getPasswordChangeFail (err) {
  return {
    type: GET_CHANGE_PASSWORD_FAIL,
    error: true,
    payload: {
      error: new Error(err),
      message: err
    }
  };
}

export function startConfirmationDeletion () {
  return {
    type: START_DELETE_ACCOUNT
  };
}

export function stopConfirmationDeletion () {
  return {
    type: STOP_DELETE_ACCOUNT
  };
}

export function confirmDeletion () {
  return {
    type: POST_DELETE_ACCOUNT
  };
}

export function postConfirmDeletion () {
  return {
    type: SEND_POST_DELETE_ACCOUNT
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

export function accountRemovedFail (err) {
  return {
    type: GET_DELETE_ACCOUNT_FAIL,
    error: true,
    payload: {
      error: new Error(err),
      message: err
    }
  };
}


export function startU2fRegistration () {
  return {
    type: START_U2F_REGISTRATION,
  };
}

export function stopU2fRegistration () {
  return {
    type: STOP_U2F_REGISTRATION
  };
}
