
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import { postOpenidFrejaFail } from "actions/OpenidConnectFreja";


export function* requestOpenidFrejaData () {
  try {
    let nin;
    let pendingNin = document.querySelector('td[class=identifier]');  // I guess this will break if the user somehow has more than one pending NIN
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
        yield put(postOpenidFrejaFail('Error: No NIN entered'));
    } else {
        const oidcFrejaData = yield call(fetchFrejaData, openid_freja_url, data);
        yield put(oidcFrejaData);
    }
  } catch(error) {
      yield put(postOpenidFrejaFail(error.toString()));
  }
}

export function fetchFrejaData (url, data) {
  return window.fetch(url, {
    credentials: 'include',
    method: 'POST',
    headers: ajaxHeaders,
    body: JSON.stringify(data)
  })
  .then(checkStatus)
  .then(response => response.json())
}
