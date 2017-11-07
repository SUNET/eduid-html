import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';

import init_app from "init-app";
import MainContainer from "containers/Main";

import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

addLocaleData([...en, ...sv]);

import * as enMsg from "../../i18n/l10n/en";
import * as svMsg from "../../i18n/l10n/sv";

const messages = {
    en: enMsg,
    sv: svMsg
};


init_app(
  document.getElementById('root'),
  <MainContainer messages={messages} />
);
