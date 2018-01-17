
import { put, call } from "redux-saga/effects";
import { ajaxHeaders, checkStatus, getRequest, notIE11Unauthn } from "actions/common";
import { getConfigFail } from "actions/Config";


export function* requestConfig () {
    const input = document.getElementById('jsconfig_url'),
          jsconfig_url = input ? input.value : EDUID_CONFIG_URL;
    try {
        console.log('Getting config from ' + jsconfig_url);
        const config = yield call(fetchConfig, jsconfig_url);
        yield put(config);
    } catch(error) {
        if (notIE11Unauthn(error) === true) {
            console.log('Error fetching config: ' + error.toString());
            yield put(getConfigFail(error.toString()));
        }
    }
}

export function fetchConfig (url) {
    return window.fetch(url, {
        ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}
