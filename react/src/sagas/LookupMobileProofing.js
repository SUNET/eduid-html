
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         postRequest, notIE11Unauthn } from "actions/common";
import { postLookupMobileFail } from "actions/LookupMobileProofing";


export function* requestLookupMobileProof () {
    try {
        const state = yield select(state => state),
              url = state.config.LOOKUP_MOBILE_PROOFING_URL,
              input = document.getElementById('norEduPersonNin'),
              nin = input ? input.value : 'testing',
              data = {
                nin: nin,
                csrf_token: state.config.csrf_token
              };

        const lookupMobileData = yield call(fetchLookupMobileProof, url, data);
        yield put(putCsrfToken(lookupMobileData));
        yield put(lookupMobileData);
    } catch(error) {
        if (notIE11Unauthn(error) === true) {
            yield put(postLookupMobileFail(error.toString()));
        }
    }
}

export function fetchLookupMobileProof (url, data) {
    return window.fetch(url, {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
