export const POST_CHANGE_PASSWORD = 'POST_CHANGE_PASSWORD';
export const POST_CHANGE_PASSWORD_SUCCESS = 'POST_CHANGE_PASSWORD_SUCCESS';
export const POST_CHANGE_PASSWORD_FAIL = 'POST_CHANGE_PASSWORD_FAIL';
export const POST_DELETE_ACCOUNT = 'POST_DELETE_ACCOUNT';
export const POST_DELETE_ACCOUNT_SUCCESS = 'POST_DELETE_ACCOUNT_SUCCESS';
export const POST_DELETE_ACCOUNT_FAIL = 'POST_DELETE_ACCOUNT_FAIL';
export const STOP_DELETE_ACCOUNT = 'STOP_DELETE_ACCOUNT';
export const START_DELETE_ACCOUNT = 'START_DELETE_ACCOUNT';

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
