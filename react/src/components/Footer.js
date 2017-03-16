
import React, { PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import EduiDAlert from 'components/EduIDAlert';


let Footer = React.createClass({

  render: function () {
    let langs = [];
    let languages = ['English', 'Svenska'];

    for (var i=0; i< languages.length; i++){
        langs.push(<span className="langselector"><span><a href="#">{languages[i]}</a></span></span>)
    }

    return (
      <div id="footer">
          <div className="container">
                <p>&copy; SUNET 2013-2016
            <span className="pull-right">
                {langs}
            </span>
          </p>
          </div>
      </div>
    );
  }
});

Footer.propTypes = {

}

export default i18n(Footer);
