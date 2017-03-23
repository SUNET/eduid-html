import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import * as actions from "actions/Nins";

export function* requestNinState () {
    try {
        yield put(actions.getNinState());
        const config = yield select(state => state.config);
        const nins = yield call(fetchNinState, config);
        yield put(nins);
    } catch(error) {
        yield put(actions.getNinStateFail(error.toString()));
    }
}

export function fetchNinState (config) {
    return window.fetch(config.LETTER_PROOFING_URL + '/proofing', {
        credentials: 'include',
        headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* postLetter () {
     try {
        const state = yield select(state => state);
        const data = {
                nin: state.nins.nin,
                csrf_token: state.nins.csrf_token
              };
        const letter = yield call(sendLetter, state.config, data);
        yield put(letter);
    } catch(error) {
        yield put(actions.postLetterFail(error.toString()));
    }
}

export function sendLetter (config, data) {
    return window.fetch(config.LETTER_PROOFING_URL + '/proofing', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}

export function* verifyLetterCode () {
     try {
        const state = yield select(state => state);
        const data = {
                verification_code: state.nins.nin,
                csrf_token: state.nins.csrf_token
              };
        const letter = yield call(sendCode, state.config, data);
        yield put(letter);
    } catch(error) {
        yield put(actions.verifyLetterCodeFail(error.toString()));
    }
}

export function sendCode (config, data) {
    return window.fetch(config.LETTER_PROOFING_URL + '/verify-code', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
