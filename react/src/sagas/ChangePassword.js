import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import * as actions from "actions/ChangePassword";


export function* requestCustomPassword () {
    try {
        yield put(actions.getSuggestedPassword());
        const config = yield select(state => state.config);
        const suggested = yield call(fetchSuggestedPassword, config);
        yield put(suggested);
    } catch(error) {
        yield put(actions.getSuggestedPasswordFail(error.toString()));
    }
}


export function fetchSuggestedPassword(config) {
    return window.fetch(config.SECURITY_URL + '/suggested-password', {
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
}
