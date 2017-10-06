
import { newCsrfToken } from "actions/Config";
import { TOKEN_SERVICE_URL } from "init-config";


export const checkStatus = function (response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else if (response.status === 0) {
        const next = document.location.href;
        document.location.href = TOKEN_SERVICE_URL + '?next=' + next;
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

export const postRequest = {
    method: 'post',
    redirect: 'manual',
    credentials: 'include',
    headers: ajaxHeaders,
}

export const getRequest = {
    method: 'get',
    redirect: 'manual',
    credentials: 'include',
    headers: ajaxHeaders,
}

export const putCsrfToken = function (action) {
  const token = action.payload.csrf_token;
  if (token !== undefined) {
    delete(action.payload.csrf_token);
    return newCsrfToken(token);
  } else {
    return {type: 'NOOP_ACTION'};
  }
};
