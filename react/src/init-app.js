
/* 
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */


import React from 'react'
import ReactDOM from 'react-dom';
import createSagaMiddleware, { take, takeEvery } from 'redux-saga'
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import { createStore, applyMiddleware } from "redux";
import eduIDApp from "./store";
import * as configActions from "actions/Config";
import * as pdataActions from "actions/PersonalData";
import * as emailActions from "actions/Emails";
import * as mobileActions from "actions/Mobile"
import * as openidActions from "actions/OpenidConnect";
import * as ninsActions from "actions/Nins";

import { requestPersonalData, savePersonalData } from "sagas/PersonalData";
import { requestEmails, saveEmail, requestResendEmailCode, requestVerifyEmail, requestRemoveEmail, requestMakePrimaryEmail } from "sagas/Emails";
import * as sagasMobile from "sagas/Mobile";
import { requestConfig } from "sagas/Config";
import { requestOpenidQRcode } from "sagas/OpenidConnect";
import * as sagasNins from "sagas/Nins";

/* i18n */

const language = navigator.languages
                   ? navigator.languages[0]
                   : (navigator.language || navigator.userLanguage);

const lang_code = language.substring(0,2);
const locale = require('react-intl/locale-data/' + lang_code);
const messages = require('../i18n/l10n/' + lang_code)

addLocaleData(locale);

/* Sagas */

function* rootSaga() {
  yield [
    takeEvery(configActions.GET_JSCONFIG_CONFIG, requestConfig),
    takeEvery(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestPersonalData),
    takeEvery(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestEmails),
    takeEvery(configActions.GET_JSCONFIG_CONFIG_SUCCESS, sagasMobile.requestMobile),
    takeEvery(pdataActions.POST_USERDATA, savePersonalData),
    takeEvery(openidActions.POST_OIDC_PROOFING_PROOFING, requestOpenidQRcode),
    takeEvery(emailActions.POST_EMAIL, saveEmail),
    takeEvery(emailActions.START_RESEND_EMAIL_CODE, requestResendEmailCode),
    takeEvery(emailActions.START_VERIFY, requestVerifyEmail),
    takeEvery(emailActions.POST_EMAIL_REMOVE, requestRemoveEmail),
    takeEvery(emailActions.POST_EMAIL_PRIMARY, requestMakePrimaryEmail),
    takeEvery(mobileActions.POST_MOBILE, sagasMobile.saveMobile),
    takeEvery(mobileActions.POST_MOBILE_REMOVE, sagasMobile.requestRemoveMobile),
    takeEvery(mobileActions.POST_MOBILE_PRIMARY, sagasMobile.requestMakePrimaryMobile),
    takeEvery(mobileActions.START_RESEND_MOBILE_CODE, sagasMobile.requestResendMobileCode),
    takeEvery(mobileActions.START_VERIFY, sagasMobile.requestVerifyMobile),
    takeEvery(ninsActions.POST_LETTER, sagasNins.postLetter),
  ];
}

const sagaMiddleware = createSagaMiddleware();

/* Store */

export const store = createStore(
        eduIDApp,
        applyMiddleware(
            sagaMiddleware,
            createLogger()
            ));

sagaMiddleware.run(rootSaga);

/* render app */

const getConfig = function () {
    if (!store.getState().config.is_configured) {
        store.dispatch(configActions.getConfig());
    }
};

const init_app = function (component, target) {
  let app = ( <Provider store={store}>
                <IntlProvider locale={ lang_code } messages={ messages }>
                  {component}
                </IntlProvider>
              </Provider> );

  ReactDOM.render(app, target, getConfig);
};

export default init_app;
