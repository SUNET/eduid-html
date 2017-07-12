
import { newCsrfToken } from "actions/Config";

export const checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(response.statusText);
  }
};

export const ajaxHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
    "Pragma": "no-cache"
};

export const putCsrfToken = function (action) {
  const token = action.payload.csrf_token;
  if (token !== undefined) {
    delete(action.payload.csrf_token);
    return newCsrfToken(token);
  } else {
    return {type: 'NOOP_ACTION'};
  }
};
