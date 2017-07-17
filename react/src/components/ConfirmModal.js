
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import EduiDAlert from 'components/EduIDAlert';


class ConfirmModal extends Component {

  render () {
    let spinning = false,
        msg, msgClass, alertElem;
    if (this.props.is_fetching) spinning = true;

    if (this.props.message) {
      msg = this.props.l10n(this.props.message, this.props.messageArgs);
      alertElem = ( <EduiDAlert className="help-block" levelMessage={this.props.levelMessage} Msg={msg}></EduiDAlert>);
    }
    return (
      <div id={this.props.modalId}
           tabIndex="-1"
           role="dialog"
           aria-labelledby="askDialogPrompt"
           aria-hidden="true"
           data-backdrop="true">

            <Modal show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <span className="help-block" id="alert">
                         {alertElem}
                    </span>
                    <div id="email-confirmation-code">
                        <TextControl name={this.props.inputId}
                                     placeholder={this.props.placeholder}
                                     componentClass='input'
                                     type='text' />
                        {this.props.resendHelp}
                        <a href="#" onClick={this.props.handleResendCode}
                           className="resend-code">
                            {this.props.resendText}
                        </a>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="cancel-button"
                            onClick={this.props.closeModal} >
                         {this.props.l10n('cm.cancel')}
                    </Button>
                    <EduIDButton bsStyle="primary"
                          className="ok-button"
                          spinning={spinning}
                          onClick={this.props.handleConfirm} >
                        {this.props.l10n('cm.ok')}
                    </EduIDButton>
                </Modal.Footer>

            </Modal>
      </div>
    );
  }
}

ConfirmModal.propTypes = {
  placeholder: PropTypes.string,
  handleConfirm: PropTypes.func,
  confirming: PropTypes.string,
  handleResendCode: PropTypes.func,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool
}

export default i18n(ConfirmModal);
