
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/Main.scss';


/* Dummy components, to be done */

class MessagesArea extends Component {
    render () {
        return (<div>Messages Area</div>);
    }
}
class PendingActions extends Component {
    render () {
        return (<div>Pending Actions</div>);
    }
}
class ProfileFIlled extends Component {
    render () {
        return (<div>Profile filled</div>);
    }
}

/* SubMain is the main component, before internationalized */

class SubMain extends Component {

    render () {

        const tabs = [{id: 'personal_data', label: this.props.l10n('main.personal_data')},
                      {id: 'nins', label: this.props.l10n('main.nins')},
                      {id: 'emails', label: this.props.l10n('main.emails')},
                      {id: 'phones', label: this.props.l10n('main.phones')},
                      {id: 'security', label: this.props.l10n('main.security')}];
        const tabsElem = tabs.map( (tab, index) => {
            return (
                <li key={index}>
                  <a className="main-nav-tabs" href='#{tab.id}'>{tab.label}</a>
                </li>
            );
        });

        return (
          <div id='wrap container'>
            <HeaderContainer />
            <div className="container position-relative">
              <noscript><div id="no-script"><h3>{this.props.l10n('main.noscript')}</h3></div></noscript>
              <div id="content-block">

                <div className='profile-combo tabbable well row' id="profile-content-area">
                  <div className='col-md-3'>
                    <div className="profile-head">
                      // <MessagesArea />
                      <h3>{this.props.l10n('main.profile_title')}</h3>
                      // <PendingActions />
                    </div>
                    <div className="tabs-left hidden-xs" id="profile-menu-large">
                      <ul className='nav nav-tabs nav-stacked'>
                        {tabsElem}
                        // <ProfileFIlled />
                        <li id="profile-menu-eppn-li">
                          <div className="profile-menu-eppn">
                            <p className="eppn-text-muted">{this.props.l10n('main.eduid_id')}: {this.props.eppn}</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className='push'></div>
            </div>
            <FooterContainer />
          </div>
        );
    }
}

SubMain.propTypes = {
    window_size: PropTypes.string,
    eppn: PropTypes.string
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
