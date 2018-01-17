import { put, select, call } from "redux-saga/effects";
import { updateIntl } from 'react-intl-redux';
import { startSubmit, setSubmitSucceeded, setSubmitFailed } from "redux-form";
import { startAsyncValidation, stopAsyncValidation } from "redux-form";

import { newCsrfToken } from "actions/Config";


export const checkStatus = function (response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else if (response.status === 0) {
        const next = document.location.href;
        document.location.assign(TOKEN_SERVICE_URL + '?next=' + next);
    } else {
        throw new Error(response.statusText);
    }
};

export const ajaxHeaders = {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
    "Pragma": "no-cache"
};

export const postRequest = {
    method: 'post',
    redirect: 'manual',
    credentials: 'include',
    headers: ajaxHeaders,
}

export const getRequest = {
    method: 'get',
    redirect: 'manual',
    credentials: 'include',
    headers: ajaxHeaders,
}

export const failRequest = function* (error, failAction) {
    if ((navigator.userAgent.indexOf("Trident/7") > -1) &&
        (error.toString() === "SyntaxError: Invalid character")) {
        const next = document.location.href;
        document.location.assign(TOKEN_SERVICE_URL + '?next=' + next);
    } else {
        yield put(failAction(error.toString()));
    }
}

export const putCsrfToken = function (action) {
  const token = action.payload.csrf_token;
  if (token !== undefined) {
    delete(action.payload.csrf_token);
    return newCsrfToken(token);
  } else {
    return {type: 'NOOP_ACTION'};
  }
};

export function saveData (getData, formName, startAction, fetcher, failAction) {
    return function* () {
        try {
            const state = yield select(state => state);
            const data = getData(state);
            yield put(startAction(data));
            yield put(startSubmit(formName));
            yield put(startAsyncValidation(formName));
            const resp = yield call(fetcher, state.config, data);
            yield put(putCsrfToken(resp));
            if (resp.type.endsWith('FAIL')) {
                yield put(setSubmitFailed(formName, ...resp.payload.error));
                yield put(stopAsyncValidation(formName, resp.payload.error));
            } else {
                yield put(setSubmitSucceeded(formName));
                yield put(stopAsyncValidation(formName));
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
            yield* failRequest(error, failAction);
        }
    }
}
