
/* 
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */

import Cookies from "js-cookie";

import React from 'react';
import ReactDOM from 'react-dom';

import { routerMiddleware } from 'react-router-redux';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import createSagaMiddleware, { takeLatest, takeEvery } from 'redux-saga';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-intl-redux'
import { updateIntl } from 'react-intl-redux';
import { createStore, applyMiddleware, compose } from "redux";
import eduIDApp from "./store";
import notifyAndDispatch from "./notify-middleware";
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
import * as headerActions from "actions/Header";

import { requestAllPersonalData, savePersonalData } from "sagas/PersonalData";
import { saveEmail, requestResendEmailCode,
         requestVerifyEmail, requestRemoveEmail,
         requestMakePrimaryEmail } from "sagas/Emails";
import * as sagasMobile from "sagas/Mobile";
import * as sagasOpenidFreja from "sagas/OpenidConnectFreja";
import { requestConfig } from "sagas/Config";
import { requestOpenidQRcode } from "sagas/OpenidConnect";
import { requestCredentials, requestPasswordChange, postDeleteAccount } from "sagas/Security";
import { requestSuggestedPassword, postPasswordChange } from "sagas/ChangePassword";
import { requestNins, requestRemoveNin } from "sagas/Nins";
import { requestOpenidFrejaData } from "sagas/OpenidConnectFreja";
import { sendLetterProofing, sendLetterCode } from "sagas/LetterProofing";
import { requestLogout } from "sagas/Header";

import PersonalDataContainer from 'containers/PersonalData';
import NinsContainer from 'containers/Nins';
import EmailsContainer from 'containers/Emails';
import MobileContainer from 'containers/Mobile';
import SecurityContainer from 'containers/Security';
import ChangePasswordContainer from 'containers/ChangePassword';
import { history } from "components/Main";


/* Sagas */

function* rootSaga() {
  yield [
    takeLatest(configActions.GET_JSCONFIG_CONFIG, requestConfig),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestAllPersonalData),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestCredentials),
    takeLatest(configActions.GET_JSCONFIG_CONFIG_SUCCESS, requestSuggestedPassword),
    takeLatest(configActions.GET_INITIAL_USERDATA, requestAllPersonalData),
    takeLatest(configActions.GET_INITIAL_USERDATA, requestCredentials),
    takeLatest(configActions.GET_INITIAL_USERDATA, requestSuggestedPassword),
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
    takeLatest(securityActions.POST_DELETE_ACCOUNT, postDeleteAccount),
    takeLatest(letterActions.POST_LETTER_PROOFING_CODE, sendLetterProofing),
    takeLatest(letterActions.POST_LETTER_PROOFING_PROOFING, sendLetterCode),
    takeLatest(ninActions.POST_NIN_REMOVE, requestRemoveNin),
    takeEvery(letterActions.STOP_LETTER_PROOFING, requestNins),
    takeEvery(ninActions.POST_NIN_REMOVE_SUCCESS, requestNins),
    takeEvery(letterActions.POST_LETTER_PROOFING_CODE_SUCCESS, requestNins),
    takeEvery(headerActions.POST_LOGOUT, requestLogout),
  ];
}

const sagaMiddleware = createSagaMiddleware();

/* for redux dev tools */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* to load persisted state from local storage */

const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem('eduid-state');
    if (serializedState === null) {
      return undefined;
    }
    return {
        ...JSON.parse(serializedState),
        notifications: {
            errors: [],
            warnings: [],
            messages: []
        }
    };
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem('eduid-state', serialized);
  } catch (err) {
    console.log('Cannot save the state: ', err);
  }
};

/* Store */


export const store = createStore(
    eduIDApp,
//    loadPersistedState(),
    composeEnhancers(
      applyMiddleware(
          sagaMiddleware,
          routerMiddleware(history),
          notifyAndDispatch,
          createLogger()
          )
    )
);

//store.subscribe(() => {
//  saveState(store.getState());
//});

sagaMiddleware.run(rootSaga);

/* Get configuration */

const getConfig = function () {
    store.dispatch(configActions.getConfig());
};

/* render app */

const init_app = function (target, component, intl=false) {
    let app, action;
    if (intl) {
        let lang_code;
        const state = store.getState();
        if (state.config.is_configured) {
            lang_code = state.config.language;
        } else {
            const language = navigator.languages
                               ? navigator.languages[0]
                               : (navigator.language || navigator.userLanguage);
            lang_code = language.substring(0,2);
        }
        const locale = require('react-intl/locale-data/' + lang_code);
        const messages = require('../i18n/l10n/' + lang_code);

        addLocaleData(locale);
        action = getConfig;
        app = (
          <Provider store={store}>
              <IntlProvider locale={ lang_code } messages={ messages }>
                {component}
              </IntlProvider>
          </Provider>
        );
    } else {
        if (component.props.allow_unauthn !== true) {
            const cookie = Cookies.get(EDUID_COOKIE_NAME);
            if (cookie === undefined) {
                const next = window.location.href;
                window.location.href = TOKEN_SERVICE_URL + '?next=' + next;
            }
            action = getConfig;
        } else {
            action = function(){};
        }
        const language = navigator.languages
                         ? navigator.languages[0]
                         : (navigator.language || navigator.userLanguage);
        const supported = AVAILABLE_LANGUAGES.map((lang) => (lang[0]))

        if (supported.includes(language)) {
            const lang_code = language.substring(0,2);
            store.dispatch(updateIntl({
                locale: lang_code,
                messages: LOCALIZED_MESSAGES[lang_code]
            }));
        }
        app = (
          <Provider store={store}>
                {component}
          </Provider>);
    }
    ReactDOM.render(app, target, action);
};

export default init_app;
