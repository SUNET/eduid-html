import React from 'react';
import ReactDOM from 'react-dom';

import init_app from "init-app";
import MainContainer from "containers/Main";


init_app(
  document.getElementById('root'),
  <MainContainer />
);
