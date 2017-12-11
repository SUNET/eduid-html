import { push } from 'react-router-redux'
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         postRequest, getRequest } from "actions/common";
import * as actions from "actions/ChangePassword";
import * as comp from "components/ChangePassword";


export function* requestSuggestedPassword () {
    try {
        yield put(actions.getSuggestedPassword());
        const config = yield select(state => state.config);
        const suggested = yield call(fetchSuggestedPassword, config);
        yield put(putCsrfToken(suggested));
        yield put(suggested);
    } catch(error) {
        yield put(actions.getSuggestedPasswordFail(error.toString()));
    }
}


export function fetchSuggestedPassword(config) {
    return window.fetch(config.SECURITY_URL + 'suggested-password', {
        ...getRequest
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
                csrf_token: state.config.csrf_token
              };
        const change = yield call(postPassword, config, data);
        yield put(putCsrfToken(change));
        if (change.type.endsWith('SUCCESS')) {
            yield put(push('security'));
        } else {
            const newpass = change.payload.error.new_password;
            if (newpass) {
                change.payload.error[comp.pwFieldCustomName] = newpass;
                delete change.payload.error.new_password;
            }
        }
        yield put(change);
    } catch(error) {
        yield put(actions.postPasswordChangeFail(error.toString()));
    }
}


export function postPassword(config, data) {
    return window.fetch(config.SECURITY_URL + 'change-password', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
