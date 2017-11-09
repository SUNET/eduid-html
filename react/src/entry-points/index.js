import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';

import init_app from "init-app";
import MainContainer from "containers/Main";

import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

addLocaleData([...en, ...sv]);


init_app(
  document.getElementById('root'),
  <MainContainer />
);
