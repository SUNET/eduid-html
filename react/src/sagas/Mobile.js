
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import * as actions from "actions/Mobile";



export function* requestMobile () {
    try {
        yield put(actions.getMobiles());
        const config = yield select(state => state.config);
        const mobiles = yield call(fetchMobiles, config);
        yield put(mobiles);
    } catch(error) {
        yield put(actions.getMobilesFail(error.toString()));
    }
}

export function fetchMobiles (config) {
    return window.fetch(config.MOBILE_URL + 'all', {
        credentials: 'include',
        headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* saveMobile () {
    try {
        const state = yield select(state => state),
              data = {
                mobile: state.mobile.mobile,
                verified: false,
                primary: false
              };
        const mobiles = yield call(sendMobile, state.config, data);
        yield put(mobiles);
    } catch(error) {
        yield put(actions.postMobilesFail(error.toString()));
    }
}

export function sendMobile (config, data) {
    return window.fetch(config.MOBILE_URL + 'new', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestResendMobileCode () {
    try {
        const state = yield select(state => state),
              data = {
                mobile: state.mobile.confirming
              };
        const resp = yield call(requestResend, state.config, data);
        yield put(resp);
    } catch(error) {
        yield put(actions.resendMobileCodeFail(error.toString()));
    }
}

export function requestResend (config, data) {
    return window.fetch(config.MOBILE_URL + 'resend-code', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestVerifyMobile () {
    try {
        const state = yield select(state => state),
              data = {
                mobile: state.mobile.confirming,
                code: state.mobile.code
              };
        const resp = yield call(requestVerify, state.config, data);
        yield put(resp);
    } catch(error) {
        yield put(actions.startVerifyFail(error.toString()));
    }
}

export function requestVerify (config, data) {
    return window.fetch(config.MOBILE_URL + 'verify', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestRemoveMobile () {
    try {
        const state = yield select(state => state),
              data = {
                mobile: state.mobile.mobile,
              };
        const resp = yield call(requestRemove, state.config, data);
        yield put(resp);
    } catch(error) {
        yield put(actions.startRemoveFail(error.toString()));
    }
}

export function requestRemove (config, data) {
    return window.fetch(config.MOBILE_URL + 'remove', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* requestMakePrimaryMobile () {
    try {
        const state = yield select(state => state),
              data = {
                mobile: state.mobile.mobile,
              };
        const resp = yield call(requestMakePrimary, state.config, data);
        yield put(resp);
    } catch(error) {
        yield put(actions.makePrimaryFail(error.toString()));
    }
}

export function requestMakePrimary (config, data) {
    return window.fetch(config.MOBILE_URL + 'primary', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
