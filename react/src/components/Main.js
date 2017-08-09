
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/Main.scss';


class Main extends Component {

  render () {
    return (
      <div>
        <HeaderContainer />
        <FooterContainer />
      </div>
    );
  }
}

Main.propTypes = {
}

export default i18n(Main);
