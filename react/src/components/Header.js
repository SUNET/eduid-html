
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';



class Header extends Component {

  render () {

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

                  <form method="POST" action="" id="logout-form">
                    <button id="logout-button"
                            className="button"
                            type="submit"
                            name="submit">
                              {this.props.l10n('header.logout')}
                    </button>
                    <input type="hidden" name="csrf" value="{'dummy-value'}" />
                  </form>

                </div>
                <div className="loa-big hidden-xs" id="eduid-header-loa">
                  {this.props.email} ({this.props.l10n(this.props.confirmed)})
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
