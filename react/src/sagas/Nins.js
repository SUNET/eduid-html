
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken } from "actions/common";
import * as actions from "actions/Nins";


export function* requestNins () {
    try {
        yield put(actions.getNins());
        const config = yield select(state => state.config);
        const nins = yield call(fetchNins, config);
        yield put(putCsrfToken(nins));
        yield put(nins);
    } catch(error) {
        yield put(actions.getNinsFail(error.toString()));
    }
}


export function fetchNins(config) {
    return window.fetch(config.PERSONAL_DATA_URL + 'nins', {
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
}


export function* requestRemoveNin () {
    try {
        const state = yield select(state => state),
              data = {
                nin: state.nins.nin,
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(requestRemove, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield put(actions.startRemoveFail(error.toString()));
    }
}

export function requestRemove (config, data) {
    return window.fetch(config.LETTER_PROOFING_URL + 'remove-nin', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
