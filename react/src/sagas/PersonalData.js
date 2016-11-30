
import { checkStatus, ajaxHeaders } from "redux-saga";
import { getUserData, getUserDataFail } from "actions/PersonalData";


export function* requestPersonalData () {
    try {
        yield put(getUserData());
        const config = select(state => state.config);
        yield call(fetchPersonalData, config);
    } catch(error) {
        yield put(getUserDataFail(error.toString()));
    }
}


function* fetchPersonalData (config) {
    yield window.fetch(config.PERSONAL_DATA_URL, {
      // To automatically send cookies only for the current domain,
      // set credentials to 'same-origin'; use 'include' for CORS
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
    .then(userdata => put(userdata))
}
