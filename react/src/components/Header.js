
import React, { PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import EduiDAlert from 'components/EduIDAlert';


let Header = React.createClass({

  render: function () {
    let langs = [];
    let languages = ['English', 'Svenska'];

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
              <ul className="nav navbar-nav">
                <li>
                  <a href="http://html.eduid.docker/index.html">Student</a>
                </li>
                <li>
                  <a href="http://html.eduid.docker/tekniker.html">Technicians</a>
                </li>
                <li>
                  <a href="http://html.eduid.docker/personal.html">Staff</a>
                </li>
                <li>
                  <a href="http://html.eduid.docker/faq.html">FAQ</a>
                </li>
              </ul>
              <div className="buttons nav navbar-nav navbar-right">

                <div className="button log-out">

                  <form id="logout-form">
                    <button id="logout-button" className="button" type="submit" name="submit">
                              Logout
                    </button>
                  </form>

                </div>

                <div className="loa-big hidden-xs" id="eduid-header-loa">



                            USER


                        (Unconfirmed)

                </div>

              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
});

Header.propTypes = {

}

export default i18n(Header);
