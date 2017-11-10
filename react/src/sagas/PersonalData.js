
import { put, select, call } from "redux-saga/effects";
import { updateIntl } from 'react-intl-redux';
import { checkStatus, ajaxHeaders, putCsrfToken,
         getRequest, postRequest } from "actions/common";
import { getAllUserdata, getAllUserdataFail, postUserdataFail } from "actions/PersonalData";

import { startSubmit, setSubmitSucceeded, setSubmitFailed } from "redux-form";
import { startAsyncValidation, stopAsyncValidation } from "redux-form";

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
          const lang = userdata.payload.language;
          if (lang) {
              yield put(updateIntl({
                  locale: lang,
                  messages: LOCALIZED_MESSAGES[lang]
              }));
          }
        } else {
          yield put(userdata);
        }
    } catch(error) {
        yield put(getAllUserdataFail(error.toString()));
    }
}


export function fetchAllPersonalData (config) {
    return window.fetch(config.PERSONAL_DATA_URL + 'all-user-data', {
        ...getRequest
    })
    .then(checkStatus)
    .then(response => response.json())
}


export function* savePersonalData () {
    try {
        const config = yield select(state => state.config);
        const data = yield select(state =>  ({
            ...state.form.personal_data.values,
            csrf_token: state.config.csrf_token
        }));
        delete data.eppn;
        yield put(pdataActions.changeUserdata(data));
        yield put(startSubmit('personal_data'));
        yield put(startAsyncValidation('personal_data'));
        const resp = yield call(sendPersonalData, config, data);
        yield put(putCsrfToken(resp));
        if (resp.type === pdataActions.POST_USERDATA_FAIL) {
            yield put(setSubmitFailed('personal_data', ...resp.payload.error));
            yield put(stopAsyncValidation('personal_data', resp.payload.error));
        } else {
            yield put(setSubmitSucceeded('personal_data'));
            yield put(stopAsyncValidation('personal_data'));
        }
        const lang = resp.payload.language;
        if (lang) {
            yield put(updateIntl({
                locale: lang,
                messages: LOCALIZED_MESSAGES[lang]
            }));
        }
        yield put(resp);
    } catch(error) {
        yield put(postUserdataFail(error.toString()));
    }
}

export function sendPersonalData (config, data) {
    return window.fetch(config.PERSONAL_DATA_URL + 'user', {
        ...postRequest,
        body: JSON.stringify(data)
    })
    .then(checkStatus)
    .then(response => response.json())
}
