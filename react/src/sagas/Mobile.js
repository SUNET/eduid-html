
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
