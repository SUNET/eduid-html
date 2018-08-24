
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         postRequest, getRequest, failRequest } from "actions/common";
import * as actions from "actions/AccountLinking";


export function* requestOrcid () {
    try {
        yield put(actions.getOrcid());
        const config = yield select(state => state.config);
        const orcid = yield call(fetchOrcid, config);
        yield put(putCsrfToken(orcid));
        yield put(orcid);
    } catch(error) {
        yield* failRequest(error, actions.getOrcidFail);
    }
}

export function* requestConnectOrcid () {
    const state = yield select(state => state);
    return window.location = state.config.ORCID_URL + 'authorize';
}

export function fetchOrcid(config) {
    return window.fetch(config.ORCID_URL, {
        ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}


export function* requestRemoveOrcid () {
    try {
        const state = yield select(state => state),
              data = {
                csrf_token: state.config.csrf_token
              };
        const resp = yield call(removeOrcid, state.config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield* failRequest(error, actions.startOrcidRemoveFail);
    }
}

export function removeOrcid (config, data) {
    return window.fetch(config.ORCID_URL + 'remove', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
