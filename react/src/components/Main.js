
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import i18n from 'i18n-messages';
import HeaderContainer from "containers/Header";
import FooterContainer from "containers/Footer";

import PersonalDataContainer from 'containers/PersonalData';
import NinsContainer from 'containers/Nins';
import EmailsContainer from 'containers/Emails';
import MobileContainer from 'containers/Mobile';
import SecurityContainer from 'containers/Security';
import ChangePasswordContainer from 'containers/ChangePassword';
import NotificationsContainer from 'containers/Notifications';
import ProfileFilledContainer from 'containers/ProfileFilled';
import PendingActionsContainer from 'containers/PendingActions';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/Main.scss';


/* SubMain is the main component, before internationalization */

class SubMain extends Component {

    render () {

        const tabs = [{id: 'personaldata', label: this.props.l10n('main.personal_data')},
                      {id: 'nins', label: this.props.l10n('main.nins')},
                      {id: 'emails', label: this.props.l10n('main.emails')},
                      {id: 'phones', label: this.props.l10n('main.phones')},
                      {id: 'security', label: this.props.l10n('main.security')}];
        const tabsElem = tabs.map( (tab, index) => {
            return (
                <li key={index}>
                  <Link className="main-nav-tabs"
                        to={`/profile/${tab.id}`}
                        id={`${tab.id}-router-link`}>
                    {tab.label}
                  </Link>
                </li>
            );
        });

        const content = (
              <div className="container position-relative">
                <noscript><div id="no-script"><h3>{this.props.l10n('main.noscript')}</h3></div></noscript>
                <div id="main-content-block">

                  <div className='profile-combo tabbable well row' id="profile-content-area">
                    <div className='col-md-3'>
                      <div className="profile-head">
                        <h3>{this.props.l10n('main.profile_title')}</h3>
                        <PendingActionsContainer />
                      </div>
                      <div className="tabs-left hidden-xs" id="profile-menu-large">
                        <ul className='nav nav-tabs nav-stacked'>
                          {tabsElem}
                          <ProfileFilledContainer />
                          <li id="profile-menu-eppn-li">
                            <div className="profile-menu-eppn">
                              <p className="eppn-text-muted">{this.props.l10n('main.eduid_id')}: {this.props.eppn}</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="tab-content info-container col-md-8 col-md-offset-1">
                      <NotificationsContainer />
                      <Route exact path="/profile/" component={PersonalDataContainer} />
                      <Route path="/profile/personaldata" component={PersonalDataContainer} />
                      <Route path="/profile/nins" component={NinsContainer} />
                      <Route path="/profile/emails" component={EmailsContainer} />
                      <Route path="/profile/phones" component={MobileContainer} />
                      <Route path="/profile/security" component={SecurityContainer} />
                      <Route path="/profile/chpass" component={ChangePasswordContainer} />
                    </div>
                  </div>
                </div>
                <div className='push'></div>
              </div>
        );
        if (this.props.testing) {
            return ([
              <HeaderContainer key="1" />,
                <div key="2">
                {content}
                </div>,
              <FooterContainer key="3" />
            ]);
        } else {
            return ([
              <HeaderContainer key="1" />,
              <BrowserRouter key="2">
                {content}
              </BrowserRouter>,
              <FooterContainer key="3" />
            ]);
        }
    }
}

SubMain.propTypes = {
    window_size: PropTypes.string,
    eppn: PropTypes.string,
    testing: PropTypes.bool
};

const SubMainContainer = connect(
   (state, props) => ({
        window_size: state.config.window_size,
        eppn: state.personal_data.eppn
    }),
    (dispatch, props) => ({}),
)(i18n(SubMain));


export { SubMainContainer };


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
            <SubMainContainer testing={false} />
          </IntlProvider>
        );
    }
}

Main.propTypes = {
    language: PropTypes.string,
    handleWindowSizeChange: PropTypes.func
}

export default Main;
