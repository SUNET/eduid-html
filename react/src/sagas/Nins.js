
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import { getNins, getNinsFail  } from "actions/Nins";


export function* requestNins () {
    try {
        yield put(getNins());
        const config = yield select(state => state.config);
        const nins = yield call(fetchNins, config);
        yield put(nins);
    } catch(error) {
        yield put(getNinsFail(error.toString()));
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
