import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import * as actions from "actions/ChangePassword";


export function* requestSuggestedPassword () {
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


export function* postPasswordChange () {
    try {
        yield put(actions.startPasswordChange());
        const state = yield select(state => state);
        const config = state.config,
              data = {
                old_password: state.chpass.old_password,
                new_password: state.chpass.new_password,
                csrf_token: state.security.csrf_token
              };
        const change = yield call(postPassword, config, data);
        yield put(change);
    } catch(error) {
        yield put(actions.postPasswordChangeFail(error.toString()));
    }
}


export function postPassword(config, data) {
    return window.fetch(config.SECURITY_URL + '/change-password', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}


export function* backToHome() {
    const link = yield document.getElementById('personaldata-router-link');
    link.click();
    window.location.reload();
}
