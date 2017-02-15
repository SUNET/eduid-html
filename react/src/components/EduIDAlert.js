
import React, { PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';

const EduIDAlert = React.createClass({
  getInitialState() {
    return {
      alertVisible: true
    };
  },

  render() {
    if (this.state.alertVisible) {
      return (
        <Alert bsStyle={this.props.levelMessage} onDismiss={this.handleAlertDismiss}>
          <h4>{this.props.Msg}</h4>
        </Alert>
      );
    }

    return (
    //   <Button onClick={this.handleAlertShow}>Show Alert</Button>
        <div></div>
    );
  },

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  },

  handleAlertShow() {
    this.setState({alertVisible: true});
  }
});


EduIDAlert.propTypes = {
  Msg: PropTypes.object,
  levelMessage: PropTypes.string
}

export default i18n(EduIDAlert);
