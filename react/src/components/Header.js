
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';



class Header extends Component {

  render () {

    return (
      <header id="header" class="header">
        <div class="logo"></div>
        <nav class="navbar navbar-default" id="eduid-navbar">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">
                <div id="eduid-logo-small" class="logo"></div>
              </a>
              <span class="navbar-toggle collapsed" data-toggle="collapse" data-target="#eduid-menu" aria-expanded="false">
              </span>
            </div>
            <div class="collapse navbar-collapse text-center" id="eduid-menu">
              <ul  class="nav navbar-nav">
                <li>
                  <a href="">{this.props.l10n('main.students')}</a>
                </li>
                <li>
                  <a href="">{this.props.l10n('main.technicians')}</a>
                </li>
                <li>
                  <a href="">{this.props.l10n('main.staff')}</a>
                </li>
                <li>
                  <a href="">{this.props.l10n('main.faq')}</a>
                </li>
              </ul>
              <div class="buttons nav navbar-nav navbar-right">
                <div class="button log-out">

                  <form method="POST" action="" id="logout-form">
                    <button id="logout-button"
                            class="button"
                            type="submit"
                            name="submit">
                              {this.props.l10n('main.logout')}
                    </button>
                    <input type="hidden" name="csrf" value="{'dummy-value'}" />
                  </form>

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
}

export default i18n(Header);
