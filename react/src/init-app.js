
/* 
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */


import React from 'react'
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { IntlProvider, addLocaleData } from 'react-intl';
import { createStore, applyMiddleware } from "redux";
import eduIDApp from "./store";
import { fetchConfig } from "actions/ConfigActions";

const language = navigator.languages
                   ? navigator.languages[0]
                   : (navigator.language || navigator.userLanguage);

const lang_code = language.substring(0,2);
const locale = require('react-intl/locale-data/' + lang_code);
const messages = require('../i18n/l10n/' + lang_code)

addLocaleData(locale);

const store = createStore(
        eduIDApp,
        applyMiddleware(
            thunkMiddleware,
            createLogger()
            ));

const init_app = function (component, target) {
  let app = ( <Provider store={store}>
                <IntlProvider locale={ lang_code } messages={ messages }>
                  {component}
                </IntlProvider>
              </Provider> );

  ReactDOM.render(app, target, () => store.dispatch(fetchConfig()));
};

export default init_app;
