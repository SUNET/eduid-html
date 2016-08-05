
const SAVE_USERDATA = 'SAVE_USERDATA';
const GET_USERDATA = 'GET_USERDATA';
const GET_USERDATA_SUCCESS = 'GET_USERDATA_SUCCESS';
const GET_USERDATA_FAIL = 'GET_USERDATA_FAIL';
const POST_USERDATA = 'POST_USERDATA';
const POST_USERDATA_SUCCESS = 'POST_USERDATA_SUCCESS';
const POST_USERDATA_FAIL = 'POST_USERDATA_FAIL';


export function saveUserdata (data) {
  return {
    type: SAVE_USERDATA,
    payload: data
  };
}

export function getUserdata () {
  return {
    type: GET_USERDATA,
  };
}

export function getUserdataSucess () {
  return {
    type: GET_USERDATA_SUCCESS,
  };
}

export function getUserdataFail () {
  return {
    type: GET_USERDATA_FAIL,
    error: true,
    payload: new Error()
  };
}

export function postUserdata () {
  return {
    type: POST_USERDATA,
  };
}

export function postUserdataSucess () {
  return {
    type: POST_USERDATA_SUCCESS,
  };
}

export function postUserdataFail () {
  return {
    type: POST_USERDATA_FAIL,
    error: true,
    payload: new Error()
  };
}
