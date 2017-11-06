
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';



class Header extends Component {

  render () {

    let email = this.props.email;
    if (email === '') {
      email = this.props.l10n("main.no-email-yet")
    }

    return (
      <header id="header" className="header">
        <div className="logo"></div>
        <nav className="navbar navbar-default" id="eduid-navbar">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                <div id="eduid-logo-small" className="logo"></div>
              </a>
              <span className="navbar-toggle collapsed" data-toggle="collapse" data-target="#eduid-menu" aria-expanded="false">
              </span>
            </div>
            <div className="collapse navbar-collapse text-center" id="eduid-menu">
              <ul  className="nav navbar-nav">
                <li>
                  <a href="">{this.props.l10n('header.students')}</a>
                </li>
                <li>
                  <a href="">{this.props.l10n('header.technicians')}</a>
                </li>
                <li>
                  <a href="">{this.props.l10n('header.staff')}</a>
                </li>
                <li>
                  <a href="">{this.props.l10n('header.faq')}</a>
                </li>
              </ul>
              <div className="buttons nav navbar-nav navbar-right">
                <div className="button log-out">

                    <button id="logout-button"
                            className="button"
                            onClick={this.props.handleLogout}>
                              {this.props.l10n('header.logout')}
                    </button>

                </div>
                <div className="loa-big hidden-xs" id="eduid-header-loa">
                  {email} ({this.props.l10n(this.props.confirmed)})
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
    email: PropTypes.string,
    confirmed: PropTypes.string
}

export default i18n(Header);
