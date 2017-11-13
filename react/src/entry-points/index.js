import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';

import init_app from "init-app";
import MainContainer from "containers/Main";

AVAILABLE_LANGUAGES.forEach((lang) => {
    const locale = require('react-intl/locale-data/' + lang[0]);
    addLocaleData(...locale);
});


init_app(
  document.getElementById('root'),
  <MainContainer />
);
