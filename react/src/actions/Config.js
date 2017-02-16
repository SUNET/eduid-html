
import { checkStatus, ajaxHeaders } from "actions/common";

export const GET_JSCONFIG_CONFIG = 'GET_JSCONFIG_CONFIG';
export const GET_JSCONFIG_CONFIG_SUCCESS = 'GET_JSCONFIG_CONFIG_SUCCESS';
export const GET_JSCONFIG_CONFIG_FAIL = 'GET_JSCONFIG_CONFIG_FAIL';

export function getConfig () {
  return {
    type: GET_JSCONFIG_CONFIG
  };
}


export function getConfigFail (err) {
  return {
    type: GET_JSCONFIG_CONFIG_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}

