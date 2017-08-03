
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';


class EduIDAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {alertVisible: true}
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
  Msg: PropTypes.string,
  levelMessage: PropTypes.string
}

export default i18n(EduIDAlert);
