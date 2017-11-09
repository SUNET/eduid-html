
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter } from 'react-router-redux'
import Collapse from 'react-bootstrap/lib/Collapse';

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
import 'style/base.scss';
import 'style/Main.scss';


export const history = createHistory()

/* SubMain is the main component, before internationalization */

class Main extends Component {

    constructor(...args) {
        super(...args);
        this.state = {
            openTabs: false
        };
    }

    componentWillMount() {
        window.addEventListener('resize', this.props.handleWindowSizeChange);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.props.handleWindowSizeChange);
    }

    render () {

        let tabsElem = '',
            profElem = '';

        if (this.props.show_sidebar) {

            const tabs = [{id: 'personaldata', label: this.props.l10n('main.personal_data')},
                          {id: 'nins', label: this.props.l10n('main.nins')},
                          {id: 'emails', label: this.props.l10n('main.emails')},
                          {id: 'phones', label: this.props.l10n('main.phones')},
                          {id: 'security', label: this.props.l10n('main.security')}],
                  size = this.props.window_size,
                  tabsElems = (classes) => {
                      return tabs.map( (tab, index) => {
                          return (
                              <li key={index}>
                                <NavLink className={classes}
                                      activeClassName="active"
                                      onClick={() => this.setState({openTabs: false})}
                                      to={`/profile/${tab.id}`}
                                      id={`${tab.id}-router-link`}>
                                  {tab.label}
                                </NavLink>
                              </li>
                          );
                      });
                  };
            if (size === 'lg' || size === 'md') {
                tabsElem = (
                      <div className='col-md-3'>
                        <div className="profile-head">
                          <h3>{this.props.l10n('main.profile_title')}</h3>
                          <PendingActionsContainer />
                        </div>
                        <div className="tabs-left hidden-xs" id="profile-menu-large">
                          <ul className='nav nav-tabs nav-stacked'>
                            {tabsElems('main-nav-tabs')}
                            <ProfileFilledContainer />
                            <li id="profile-menu-eppn-li">
                              <div className="profile-menu-eppn">
                                <p className="eppn-text-muted">{this.props.l10n('main.eduid_id')}: {this.props.eppn}</p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                );
            } else {
                tabsElem = [(
                      <div key="1" className='col-md-3'>
                        <div className="profile-head">
                          <h3>{this.props.l10n('main.profile_title')}</h3>
                          <PendingActionsContainer />
                        </div>
                      </div>),
                      (<nav key="2" className="navbar navbar-default hidden-md hidden-lg" role="navigation">
                        <div className="container-fluid">
                          <div className="navbar-header">
                            <button type="button"
                                    className="navbar-toggle collapsed"
                                    onClick={() => this.setState({openTabs: !this.state.openTabs})}>
                              <span className="sr-only">{this.props.l10n('main.toggle-navigation')}</span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                              <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">
                              {this.props.l10n('main.menu')}
                            </a>
                          </div>
    
                        <Collapse in={this.state.openTabs}>
                          <ul className="nav nav-stacked nav-tabs navbar-nav">
                              {tabsElems('main-nav-tabs btn btn-block')}
                          </ul>
                        </Collapse>
                      </div>
                    </nav>
                )];
                
                profElem = (
                      <ul className="nav nav-stacked nav-tabs navbar-nav">
                        <ProfileFilledContainer />
                        <li id="profile-menu-eppn-li">
                          <div className="profile-menu-eppn">
                            <p className="eppn-text-muted">{this.props.l10n('main.eduid_id')}: {this.props.eppn}</p>
                          </div>
                        </li>
                      </ul>
                );
            }
        }

        return ([
          <HeaderContainer key="1" />,
            <ConnectedRouter history={history} key="2">
              <div className="container position-relative">
                <noscript><div id="no-script"><h3>{this.props.l10n('main.noscript')}</h3></div></noscript>
                <div id="content-block">

                  <div className='profile-combo tabbable well row' id="profile-content-area">
                    {tabsElem}
                    <div className="tab-content info-container col-md-8 col-md-offset-1">
                      <div className="tab-pane active">
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
                    {profElem}
                  </div>
                </div>
                <div className='push'></div>
              </div>
            </ConnectedRouter>,
          <FooterContainer key="3" />
        ]);
    }
}

Main.propTypes = {
    window_size: PropTypes.string,
    show_sidebar: PropTypes.bool,
    eppn: PropTypes.string,
    language: PropTypes.string,
    handleWindowSizeChange: PropTypes.func,
    messages: PropTypes.object
}

export default Main;
