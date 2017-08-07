
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';

import HeaderContainer from "containers/Header";


class Main extends Component {

  render () {
    return (
      <div>
        <HeaderContainer />
      </div>
    );
  }
}

Main.propTypes = {
}

export default i18n(Main);
