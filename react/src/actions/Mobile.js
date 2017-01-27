export const GET_MOBILES = 'GET_MOBILES';
export const GET_MOBILES_SUCCESS = 'GET_MOBILES_SUCCESS';
export const GET_MOBILES_FAIL = 'GET_MOBILES_FAIL';
export const CHANGE_MOBILES = 'CHANGE_MOBILES';
export const POST_MOBILES = 'POST_MOBILES';
export const POST_MOBILES_SUCCESS = 'POST_MOBILES_NEW_SUCCESS';
export const POST_MOBILES_FAIL = 'POST_MOBILES_FAIL';

export function getMobiles () {
  return {
    type: GET_MOBILES,
  };
}

export function getMobilesFail (err) {
  return {
    type: GET_MOBILES_FAIL, error: true,
    payload: new Error(err)
  };
}

export function changeMobile (data) {
  return {
    type: CHANGE_MOBILES,
    payload: data
  };
}

export function postMobile () {
  return {
    type: POST_MOBILES
  };
}

export function postMobileFail (err) {
  return {
    type: POST_MOBILES_FAIL,
    error: true,
    payload: new Error(err)
  };
}
