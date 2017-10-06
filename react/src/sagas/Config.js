
import { put, call } from "redux-saga/effects";
import { ajaxHeaders, checkStatus, getRequest } from "actions/common";
import { getConfigFail } from "actions/Config";
import { EDUID_CONFIG_URL } from "init-config";


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

export function fetchConfig (url) {
    return window.fetch(url, {
        ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}
