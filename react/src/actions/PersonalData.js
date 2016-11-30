
export const GET_USERDATA = 'GET_USERDATA';
export const GET_USERDATA_SUCCESS = 'GET_USERDATA_SUCCESS';
export const GET_USERDATA_FAIL = 'GET_USERDATA_FAIL';
export const CHANGE_USERDATA = 'CHANGE_USERDATA';
export const POST_USERDATA = 'POST_USERDATA';
export const POST_USERDATA_SUCCESS = 'POST_USERDATA_SUCCESS';
export const POST_USERDATA_FAIL = 'POST_USERDATA_FAIL';


export function getUserdata () {
  return {
    type: GET_USERDATA,
  };
}

export function getUserdataFail (err) {
  return {
    type: GET_USERDATA_FAIL,
    error: true,
    payload: new Error(err)
  };
}

export function changeUserdata (data) {
  return {
    type: CHANGE_USERDATA,
    payload: data
  };
}

export function postUserdata () {
  return {
    type: POST_USERDATA
  };
}

export function postUserdataFail (err) {
  return {
    type: POST_USERDATA_FAIL,
    error: true,
    payload: new Error(err)
  };
}
