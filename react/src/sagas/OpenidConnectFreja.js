
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken } from "actions/common";
import * as actions from "actions/OpenidConnectFreja";


export function* initializeOpenidFrejaData () {
  try {
    let nin;
    let pendingNin = document.querySelector('td[class=identifier]');  // If a user has more than one unconfirmed NIN the first in the list will be picked
    // Check if there is a pending NIN before trying form input
    if (pendingNin) nin = pendingNin.textContent;
    if (!nin) {
      let inputNin = document.querySelector('input[name=norEduPersonNIN]');
      if (!inputNin) {
        // Form is always created, only hidden. Must be running tests.
        nin = 'testing';
      } else {
        nin = inputNin.value ? inputNin.value : 'no nin'
      }
    }

    const openid_freja_url = yield select(state => state.config.OIDC_PROOFING_FREJA_URL),
          data = {
            'nin': nin
          };

    console.log('Getting opaque data for NIN: ' + nin);

    if (nin === 'no nin') {
        yield put(actions.postOpenidFrejaFail('Error: No NIN entered'));
    } else {
        const oidcFrejaData = yield call(fetchFrejaData, openid_freja_url, data);
        yield put(putCsrfToken(oidcFrejaData));
        yield put(oidcFrejaData);
    }
  } catch(error) {
      yield put(actions.postOpenidFrejaFail(error.toString()));
  }
}

export function* requestOpenidFrejaData() {
  try {
    const openid_freja_url = yield select(state => state.config.OIDC_PROOFING_FREJA_URL);
    console.log('Checking for existing opaque data');
    const oidcFrejaData = yield call(fetchFrejaData, openid_freja_url);
    yield put(oidcFrejaData);
  } catch(error) {
      yield put(actions.getOpenidFrejaFail(error.toString()));
  }
}

export function fetchFrejaData (url, data) {
  let options = {
    credentials: 'include',
    headers: ajaxHeaders,
    method: 'GET',
  };
  if (data) {
    options['body'] = JSON.stringify(data);
    options['method'] = 'POST';
  }
  return window.fetch(url, options)
  .then(checkStatus)
  .then(response => response.json())
}
