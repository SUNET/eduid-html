
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "actions/common";
import { getConfigFail } from "actions/Config";


export function* requestConfig () {
    try {
        const input = document.getElementById('jsconfig_url'),
              jsconfig_url = input ? input.value : '/services/jsconfig/config';
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
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
}
