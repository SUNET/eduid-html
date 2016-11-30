
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import { getConfigFail } from "actions/Config";


export function* requestConfig () {
    try {
        const input = document.getElementById('jsconfig_url'),
              jsconfig_url = input ? input.value : '/services/jsconfig/config';
        yield call(fetchConfig, jsconfig_url);
    } catch(error) {
        yield put(getConfigFail(error.toString()));
    }
}

function* fetchConfig (url) {
    yield window.fetch(url, {
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(config => put(config))
}
