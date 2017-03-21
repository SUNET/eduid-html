
import React, { PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import EduiDAlert from 'components/EduIDAlert';


let LeftMenu = React.createClass({

  render: function () {
    let langs = [];
    let languages = ['English', 'Svenska'];

    return (
     <div className="col-md-3">
          <div className="profile-head">
              <h3>Profile</h3>
              <ul className="list-unstyled pending-actions">
                    <li><a href="#nins">Add national identity number</a></li>
                    <li><a href="#emails/verify/1">An email address is pending confirmation</a></li>
                    <li><a href="#mobiles/verify/7">A mobile phone number is pending confirmation</a></li>
                </ul>
          </div>
          <div className="tabs-left hidden-xs" id="profile-menu-large">
          <ul className="nav nav-tabs nav-stacked">
            <li className="active">
              <a className="main-nav-tabs" href="#personaldata">Personal information</a>
            </li>
            <li>
              <a className="main-nav-tabs" href="#nins">Confirm Identity</a>
            </li>
            <li>
              <a className="main-nav-tabs" href="#emails">Email addresses</a>
            </li>
            <li>
              <a className="main-nav-tabs" href="#mobiles">Mobile phone numbers</a>
            </li>
            <li>
              <a className="main-nav-tabs" href="#security">Security</a>
            </li>
            <li id="profile-filled-li">
              <div className="profile-filled profile-filled-large">
                <div className="title">Completion: <span class="percentaje">85%</span></div>
                <div className="progress progress-striped">
                  <div className="progress-bar profile-filled-progress-bar"></div>
                </div>
              </div>
            </li>
            <li id="profile-menu-eppn-li">
              <div className="profile-menu-eppn">
                <p className="eppn-text-muted">eduID identifier: bivim-mimip</p>
              </div>
            </li>
          </ul>
        </div>

     </div>
    );
  }
});

LeftMenu.propTypes = {

}

export default i18n(LeftMenu);
