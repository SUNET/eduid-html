
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
import createSagaMiddleware, { takeLatest, takeEvery } from 'redux-saga';
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
import * as securityActions from "actions/Security";
import * as pwActions from "actions/ChangePassword";
import * as ninActions from "actions/Nins";
import * as openidFrejaActions from "actions/OpenidConnectFreja";
import * as letterActions from "actions/LetterProofing";

import { requestPersonalData, savePersonalData } from "sagas/PersonalData";
import { requestEmails, saveEmail, requestResendEmailCode,
         requestVerifyEmail, requestRemoveEmail,
         requestMakePrimaryEmail } from "sagas/Emails";
import * as sagasMobile from "sagas/Mobile";
import * as sagasOpenidFreja from "sagas/OpenidConnectFreja";
import { requestConfig } from "sagas/Config";
import { requestOpenidQRcode } from "sagas/OpenidConnect";
import { requestCredentials, requestPasswordChange, postDeleteAccount } from "sagas/Security";
import { requestSuggestedPassword, postPasswordChange, backToHome } from "sagas/ChangePassword";
import { requestNins, requestRemoveNin } from "sagas/Nins";
import { requestOpenidFrejaData } from "sagas/OpenidConnectFreja";
import { sendLetterProofing, sendLetterCode } from "sagas/LetterProofing";

import PersonalDataContainer from 'containers/PersonalData';
import NinsContainer from 'containers/Nins';
import EmailsContainer from 'containers/Emails';
import MobileContainer from 'containers/Mobile';
import SecurityContainer from 'containers/Security';
import ChangePasswordContainer from 'containers/ChangePassword';

/* i18n */

const language = navigator.languages
                   ? navigator.languages[0]
                   : (navigator.language || navigator.userLanguage);

const lang_code = language.substring(0,2);
const locale = require('react-intl/locale-data/' + lang_code);
const messages = require('../i18n/l10n/' + lang_code);

addLocaleData(locale);

/* Sagas */

function* rootSaga() {
  yield [
    takeLatest(configActions.GET_JSCONFIG_CONFIG, requestConfig),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestPersonalData),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestEmails),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, sagasMobile.requestMobile),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestCredentials),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestSuggestedPassword),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestNins),
    takeLatest(pdataActions.POST_USERDATA, savePersonalData),
    takeLatest(openidActions.POST_OIDC_PROOFING_PROOFING, requestOpenidQRcode),
    takeLatest(openidFrejaActions.POST_OIDC_PROOFING_FREJA_PROOFING, sagasOpenidFreja.initializeOpenidFrejaData),
    takeLatest(openidFrejaActions.GET_OIDC_PROOFING_FREJA_PROOFING, sagasOpenidFreja.requestOpenidFrejaData),
    takeLatest(openidFrejaActions.SHOW_OIDC_FREJA_MODAL, sagasOpenidFreja.checkNINAndShowFrejaModal),
    takeLatest(openidFrejaActions.HIDE_OIDC_FREJA_MODAL, sagasOpenidFreja.closeFrejaModal),
    takeLatest(emailActions.POST_EMAIL, saveEmail),
    takeLatest(emailActions.START_RESEND_EMAIL_CODE, requestResendEmailCode),
    takeLatest(emailActions.START_VERIFY, requestVerifyEmail),
    takeLatest(emailActions.POST_EMAIL_REMOVE, requestRemoveEmail),
    takeLatest(emailActions.POST_EMAIL_PRIMARY, requestMakePrimaryEmail),
    takeLatest(mobileActions.POST_MOBILE, sagasMobile.saveMobile),
    takeLatest(mobileActions.POST_MOBILE_REMOVE, sagasMobile.requestRemoveMobile),
    takeLatest(mobileActions.POST_MOBILE_PRIMARY, sagasMobile.requestMakePrimaryMobile),
    takeLatest(mobileActions.START_RESEND_MOBILE_CODE, sagasMobile.requestResendMobileCode),
    takeLatest(mobileActions.START_VERIFY, sagasMobile.requestVerifyMobile),
    takeLatest(securityActions.GET_CHANGE_PASSWORD, requestPasswordChange),
    takeLatest(pwActions.POST_PASSWORD_CHANGE, postPasswordChange),
    takeLatest(pwActions.POST_SECURITY_CHANGE_PASSWORD_SUCCESS, backToHome),
    takeLatest(securityActions.POST_DELETE_ACCOUNT, postDeleteAccount),
    takeLatest(letterActions.POST_LETTER_PROOFING_CODE, sendLetterProofing),
    takeLatest(letterActions.POST_LETTER_PROOFING_PROOFING, sendLetterCode),
    takeLatest(ninActions.POST_NIN_REMOVE, requestRemoveNin),
    takeEvery(letterActions.STOP_LETTER_PROOFING, requestNins),
    takeEvery(ninActions.POST_NIN_REMOVE_SUCCESS, requestNins),
    takeEvery(letterActions.POST_LETTER_PROOFING_CODE_SUCCESS, requestNins),
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

const init_app = function (target, component) {
  let app;
  if (component) {
    app = (
      <Provider store={store}>
        <IntlProvider locale={ lang_code } messages={ messages }>
          {component}
        </IntlProvider>
      </Provider>
    );
    ReactDOM.render(app, target, getConfig);
  } else {
    app = ( <Provider store={store}>
      <IntlProvider locale={ lang_code } messages={ messages }>
        <BrowserRouter>
          <div>
            <Route exact path="/profile/" render={props => {
              switch (props.location.hash.split('#')[1]) {
                case 'personaldata':
                  return (<PersonalDataContainer />);
                  break;
                case 'nins':
                  return (<NinsContainer />);
                  break;
                case 'emails':
                  return (<EmailsContainer />);
                  break;
                case 'mobiles':
                  return (<MobileContainer />);
                  break;
                case 'security':
                  return (<SecurityContainer />);
                  break;
                case 'chpass':
                  return (<ChangePasswordContainer />);
                  break;
                default:
                  return (<PersonalDataContainer />);
              }
            }}/>

            <ul role="nav" className="hidden">
              <li><Link to="/profile/#personaldata" id="personaldata-router-link">Personal Data</Link></li>
              <li><Link to="/profile/#nins" id="nins-router-link">Nins</Link></li>
              <li><Link to="/profile/#emails" id="emails-router-link">Emails</Link></li>
              <li><Link to="/profile/#mobiles" id="mobiles-router-link">Phones</Link></li>
              <li><Link to="/profile/#security" id="security-router-link">Security</Link></li>
              <li><Link to="/profile/#chpass" id="chpass-router-link"> </Link></li>
            </ul>
          </div>
        </BrowserRouter>
      </IntlProvider>
    </Provider> );
    ReactDOM.render(app, target, getConfig);
  }
  return app;
};

export default init_app;
