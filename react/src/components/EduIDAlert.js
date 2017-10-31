
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Alert from 'react-bootstrap/lib/Alert';
import FormGroup from 'react-bootstrap/lib/FormGroup';

import i18n from 'i18n-messages';


class EduIDAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {alertVisible: true}
    this.handleAlertDismiss.bind(this);
    this.handleAlertShow.bind(this);
  }

  render() {
    if (this.state.alertVisible) {

      return (
        <Alert bsStyle={this.props.levelMessage} onDismiss={this.handleAlertDismiss}>
          <p className={this.props.levelMessage}>{this.props.Msg}</p>
        </Alert>
      );
    }

    return (
    //   <Button onClick={this.handleAlertShow}>Show Alert</Button>
        <div></div>
    );
  }

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  handleAlertShow() {
    this.setState({alertVisible: true});
  }
}


EduIDAlert.propTypes = {
  Msg: PropTypes.any,
  levelMessage: PropTypes.string
}

export default i18n(EduIDAlert);
