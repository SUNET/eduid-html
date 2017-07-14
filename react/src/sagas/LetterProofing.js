
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken } from "actions/common";
import * as actions from "actions/LetterProofing";


export function* sendLetterProofing () {
    try {
        yield put(actions.waitLetterProofing());
        const state = yield select(state => state),
              data = {
                nin: state.nins.nin,
                csrf_token: state.config.csrf_token
              };
        
        const response = yield call(fetchLetterProofing, state.config, data);
        yield put(putCsrfToken(response));
        yield put(response);
    } catch(error) {
        yield put(actions.postLetterProofingFail(error));
    }
}

export function fetchLetterProofing (config, data) {
    return window.fetch(config.LETTER_PROOFING_URL, {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
