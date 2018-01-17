
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         postRequest, notIE11Unauthn } from "actions/common";
import { postOpenidFail } from "actions/OpenidConnect";


export function* requestOpenidQRcode () {
    try {
        const openid_url = yield select(state => state.config.OIDC_PROOFING_URL),
              input = document.querySelector('input[name=norEduPersonNIN]'),
              nin = input ? (input.value || 'no nin') : 'testing',
              data = {
                'nin': nin
              };

        console.log('Getting QRCode for NIN: ' + nin);

        if (nin === 'no nin') {
            yield put(postOpenidFail('Error: No NIN entered'));
        } else {
            const oidcData = yield call(fetchQRcode, openid_url, data);
            yield put(putCsrfToken(oidcData));
            yield put(oidcData);
        }
    } catch(error) {
        if (notIE11Unauthn(error) === true) {
            yield put(postOpenidFail(error.toString()));
        }
    }
}

export function fetchQRcode (url, data) {
    return window.fetch(url, {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
