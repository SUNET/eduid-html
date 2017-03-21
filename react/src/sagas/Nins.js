import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import * as actions from "actions/Nins";


export function* postLetter () {
     try {
        debugger;
        const state = yield select(state => state);
        debugger;
        const data = {
                nin: state.nins.nin,
                csrf_token: state.nins.csrf_token
              };
        debugger;
        const letter = yield call(sendLetter, state.config, data);
        yield put(letter);
    } catch(error) {
        debugger;
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

