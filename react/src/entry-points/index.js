import React from 'react';
import ReactDOM from 'react-dom';
import { addLocaleData } from 'react-intl';

import init_app from "init-app";
import MainContainer from "containers/Main";

const locales = [];

//AVAILABLE_LANGUAGES.forEach((lang) => {
    //const locale = require('react-intl/locale-data/' + lang[0]);
    //addLocaleData([...locale]);
//});


//require.ensure([], () => {  
    //AVAILABLE_LANGUAGES.forEach((lang) => {
        //const locale = require('react-intl/locale-data/' + lang[0]);
        //addLocaleData([...locale]);
    //});
//});

// XXX TODO load locales dynamically based on AVAILABLE_LANGUAGES.
// None of the above commented techniques work

import en from 'react-intl/locale-data/en';
import sv from 'react-intl/locale-data/sv';

addLocaleData([...en, ...sv])

init_app(
  document.getElementById('root'),
  <MainContainer />
);
