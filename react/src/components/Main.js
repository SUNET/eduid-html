
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/Main.scss';


/* SubMain is the main component, before internationalized */

class SubMain extends Component {

    render () {
        return (
            <div>
              <HeaderContainer />
              <FooterContainer />
            </div>
        );
    }
}

SubMain.propTypes = {
    window_size: PropTypes.string
};

const SubMainContainer = connect(
   (state, props) => ({
        window_size: state.config.window_size
    }),
    (dispatch, props) => ({}),
)(i18n(SubMain));


/* localize the internationalized SubMain component,
 * and wrap it with IntlProvider, to produce the final
 * Main Component */

class Main extends Component {

    componentWillMount() {
        window.addEventListener('resize', this.props.handleWindowSizeChange);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.props.handleWindowSizeChange);
    }

    render () {
        const lang = this.props.language,
              locale = require('react-intl/locale-data/' + lang),
              messages = require('../../i18n/l10n/' + lang);

        addLocaleData(locale);

        return (
          <IntlProvider locale={ lang } messages={ messages }>
            <SubMainContainer />
          </IntlProvider>
        );
    }
}

Main.propTypes = {
    language: PropTypes.string,
    handleWindowSizeChange: PropTypes.func
}

export default Main;
