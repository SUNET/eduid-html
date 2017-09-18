
import { put, select, call } from "redux-saga/effects";
import { ajaxHeaders } from "actions/common";
import { getConfigFail } from "actions/Config";
import { EDUID_CONFIG_URL, TOKEN_SERVICE_URL } from "init-config";


export function* requestConfig () {
    try {
        const input = document.getElementById('jsconfig_url'),
              jsconfig_url = input ? input.value : EDUID_CONFIG_URL;
        console.log('Getting config from ' + jsconfig_url);
        const config = yield call(fetchConfig, jsconfig_url);
        yield put(config);
    } catch(error) {
        console.log('Error fetching config: ' + error.toString());
        yield put(getConfigFail(error.toString()));
    }
}

const checkStatus = function (response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else if (response.status === 0) {
        const next = document.location.href;
        document.location.href = TOKEN_SERVICE_URL + '?next=' + next;
    } else {
        throw new Error(response.statusText);
    }
};

export function fetchConfig (url) {
    return window.fetch(url, {
      credentials: 'include',
      headers: ajaxHeaders,
      redirect: 'manual'
    })
    .then(checkStatus)
    .then(response => response.json())
}
