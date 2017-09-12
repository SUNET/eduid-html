
import { put, select, call } from "redux-saga/effects";
import { checkStatus, ajaxHeaders, putCsrfToken } from "actions/common";
import { getAllUserdata, getAllUserdataFail, postUserdataFail } from "actions/PersonalData";
import * as ninActions from "actions/Nins";
import * as emailActions from "actions/Emails";
import * as phoneActions from "actions/Mobile";
import * as pdataActions from "actions/PersonalData";
import * as profileActions from "actions/Profile";


export function* requestAllPersonalData () {
    try {
        yield put(getAllUserdata());
        const config = yield select(state => state.config);
        let userdata = yield call(fetchAllPersonalData, config);
        yield put(putCsrfToken(userdata));
        if (userdata.type === pdataActions.GET_ALL_USERDATA_SUCCESS) {
          const filled = calculateProfileFilled(userdata);
          yield put(profileActions.profileFilled(filled.max, filled.cur, filled.pending));
          const nins = userdata.payload.nins;
          delete userdata.payload.nins;
          const ninAction = {
              type: ninActions.GET_NINS_SUCCESS,
              payload: {
                  nins: nins
              }
          };
          const emails = userdata.payload.emails;
          delete userdata.payload.emails;
          const emailAction = {
              type: emailActions.GET_EMAILS_SUCCESS,
              payload: {
                  emails: emails
              }
          };
          const phones = userdata.payload.phones;
          delete userdata.payload.phones;
          const phoneAction = {
              type: phoneActions.GET_MOBILES_SUCCESS,
              payload: {
                  phones: phones
              }
          };
          yield put(ninAction);
          yield put(emailAction);
          yield put(phoneAction);
          userdata.type = pdataActions.GET_USERDATA_SUCCESS;
          yield put(userdata);
        } else {
          yield put(userdata);
        }
    } catch(error) {
        yield put(getAllUserdataFail(error.toString()));
    }
}


export function fetchAllPersonalData (config) {
    return window.fetch(config.PERSONAL_DATA_URL + 'all-user-data', {
      // To automatically send cookies only for the current domain,
      // set credentials to 'same-origin'; use 'include' for CORS
      credentials: 'include',
      headers: ajaxHeaders
    })
    .then(checkStatus)
    .then(response => response.json())
}


function calculateProfileFilled (userdata) {
    let filled = {max: 0, cur: 0, pending: []};
    ['given_name', 'surname', 'display_name', 'language'].forEach( (pdata) => {
        filled.max += 1;
        if (userdata.payload[pdata]) {
            filled.cur += 1;
        } else {
            filled.pending.push(pdata);
        }
    });
    ['emails', 'phones', 'nins'].forEach( (tab) => {
        filled.max += 1;
        if (userdata.payload[tab].length > 0) {
            filled.cur += 1;
        } else {
            filled.pending.push(tab);
        }
    });
    return filled;
}


export function* savePersonalData () {
    try {
        const config = yield select(state => state.config);
        const data = yield select(state =>  ({
            ...state.personal_data,
            csrf_token: state.config.csrf_token
        }));
        delete data.is_fetching;
        delete data.failed;
        delete data.eppn;
        const resp = yield call(sendPersonalData, config, data);
        yield put(putCsrfToken(resp));
        yield put(resp);
    } catch(error) {
        yield put(postUserdataFail(error.toString()));
    }
}

export function sendPersonalData (config, data) {
    return window.fetch(config.PERSONAL_DATA_URL + 'user', {
      method: 'post',
      credentials: 'include',
      headers: ajaxHeaders,
      body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
