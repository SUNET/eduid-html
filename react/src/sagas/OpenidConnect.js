
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders } from "sagas/common";
import { postOpenidFail } from "actions/OpenidConnect";


export function* requestOpenidQRcode () {
    try {
        const openid_url = select(state => state.config.OIDC_PROOFING_URL),
              input = document.querySelector('input[name=norEduPersonNIN]'),
              nin = input ? (input.value || 'no nin') : 'testing',
              data = {
                'nin': nin
              };

        console.log('Getting QRCode for NIN: ' + nin);

        if (nin === 'no nin') {
            put(postOpenidFail('Error: No NIN entered'));
        } else {
            yield call(fetchQRcode, openid_url, data);
        }
    } catch(error) {
        yield put(postOpenidFail(error.toString()));
    }
}

function* fetchQRcode (url, data) {
    yield window.fetch(url, {
        credentials: 'include',
        method: 'POST',
        headers: ajaxHeaders,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(oidcData => put(oidcData))
}
