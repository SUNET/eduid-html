import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';

import init_app from "init-app";
import MainContainer from "containers/Main";

const locales = [];

AVAILABLE_LANGUAGES.forEach((lang) => {
    const locale = require('react-intl/locale-data/' + lang[0]);
    locales.push(locale);
});

addLocaleData([].concat(...locales));


init_app(
  document.getElementById('root'),
  <MainContainer />
);
