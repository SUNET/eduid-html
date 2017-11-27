
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken,
         postRequest } from "actions/common";
import { postLookupMobileFail } from "actions/LookupMobileProofing";


export function* requestLookupMobileProof () {
    try {
        const url = yield select(state => state.config.LOOKUP_MOBILE_PROOFING_URL),
              input = document.querySelector('input[name=norEduPersonNIN]'),
              nin = input ? input.value : 'testing',
              data = {
                'nin': nin
              };

        const lookupMobileData = yield call(fetchLookupMobileProof, url, data);
        yield put(putCsrfToken(lookupMobileData));
        yield put(lookupMobileData);
    } catch(error) {
        yield put(postLookupMobileFail(error.toString()));
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
