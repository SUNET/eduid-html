
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Collapse from 'react-bootstrap/lib/Collapse';

import i18n from 'i18n-messages';



class Header extends Component {

  constructor(...args) {
      super(...args);
      this.state = {
          openLinks: false
      };
  }

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
              <span className="navbar-toggle collapsed"
                    aria-expanded="false"
                    onClick={() => this.setState({openLinks: !this.state.openLinks})}>
              </span>
            </div>
            <Collapse in={this.state.openLinks}>
              <div className="collapse navbar-collapse text-center"
                   id="eduid-menu">
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
                    </form>

                  </div>
                  <div className="loa-big hidden-xs" id="eduid-header-loa">
                    {email} ({this.props.l10n(this.props.confirmed)})
                  </div>
                </div>
              </div>
            </Collapse>
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
