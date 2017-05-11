
/* 
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';  

import { BrowserRouter, Route, Link } from 'react-router-dom';

import createSagaMiddleware, { take, takeEvery } from 'redux-saga';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import { createStore, applyMiddleware, compose } from "redux";
import eduIDApp from "./store";
import * as configActions from "actions/Config";
import * as pdataActions from "actions/PersonalData";
import * as emailActions from "actions/Emails";
import * as mobileActions from "actions/Mobile"
import * as openidActions from "actions/OpenidConnect";
import * as ninsActions from "actions/Nins";
import * as securityActions from "actions/Security";
import * as pwActions from "actions/ChangePassword";

import { requestPersonalData, savePersonalData } from "sagas/PersonalData";
import { requestEmails, saveEmail, requestResendEmailCode,
         requestVerifyEmail, requestRemoveEmail,
         requestMakePrimaryEmail } from "sagas/Emails";
import * as sagasMobile from "sagas/Mobile";
import { requestConfig } from "sagas/Config";
import { requestOpenidQRcode } from "sagas/OpenidConnect";
import { requestCredentials, requestPasswordChange } from "sagas/Security";
import { requestSuggestedPassword, postPasswordChange } from "sagas/ChangePassword";

import PersonalDataContainer from 'containers/PersonalData';
import EmailsContainer from 'containers/Emails';
import MobileContainer from 'containers/Mobile';
import SecurityContainer from 'containers/Security';

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
    takeEvery(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestCredentials),
    takeEvery(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestSuggestedPassword),
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
    takeEvery(securityActions.GET_CHANGE_PASSWORD, requestPasswordChange),
    takeEvery(pwActions.POST_PASSWORD_CHANGE, postPasswordChange),
  ];
}

const sagaMiddleware = createSagaMiddleware();

/* for redux dev tools */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* Store */

export const store = createStore(
        eduIDApp,
        composeEnhancers(
          applyMiddleware(
              sagaMiddleware,
              createLogger()
              )));

sagaMiddleware.run(rootSaga);

/* render app */

const getConfig = function () {
    if (!store.getState().config.is_configured) {
        store.dispatch(configActions.getConfig());
    }
};

const init_app = function (target) {
    const app = ( <Provider store={store}>
                    <IntlProvider locale={ lang_code } messages={ messages }>
                        <BrowserRouter>
                          <div>
                            <Route exact path="/profile/" component={PersonalDataContainer} />
                            <Route exact path="/profile/personaldata" component={PersonalDataContainer} />
                            <Route exact path="/profile/emails" component={EmailsContainer} />
                            <Route exact path="/profile/mobiles" component={MobileContainer} />
                            <Route exact path="/profile/security" component={SecurityContainer} />

                            <ul role="nav" className="hidden">
                              <li><Link to="/profile/personaldata" id="personaldata-router-link">Personal Data</Link></li>
                              <li><Link to="/profile/emails" id="emails-router-link">Emails</Link></li>
                              <li><Link to="/profile/mobiles" id="mobiles-router-link">Phones</Link></li>
                              <li><Link to="/profile/security" id="security-router-link">Security</Link></li>
                            </ul>
                          </div>
                        </BrowserRouter>
                    </IntlProvider>
                  </Provider> );
    ReactDOM.render(app, target, getConfig);
    return app;
};

export default init_app;
