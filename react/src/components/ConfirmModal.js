
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
        msgid, msg, alertElem;
    if (this.props.is_fetching) spinning = true;
    if (this.props.resending.is_fetching) spinning = true;

    if (this.props.resending.failed) {
      msg= this.props.l10n(this.props.resending.error.form);
      alertElem = ( <EduiDAlert levelMessage="danger" Msg={msg}></EduiDAlert> );
    }

    if (this.props.resending.message) {
      msg = this.props.l10n(this.props.resending.message, {email: this.props.confirming});
      alertElem = ( <EduiDAlert className="help-block" levelMessage="warning" Msg={msg}></EduiDAlert>);
    }
    return (
      <div id="emailConfirmDialog"
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
                        {this.props.l10n('cm.lost_code')}
                        <a href="#" onClick={this.props.handleResendCode}
                           className="resend-code">
                            {this.props.l10n('cm.resend_code')}
                        </a>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="finish-button"
                            onClick={this.props.finishModal} >
                         {this.props.l10n('cm.finish')}
                    </Button>
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
  resending: PropTypes.object,
  handleResendCode: PropTypes.func,
  finishModal: PropTypes.func,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool
}

export default i18n(ConfirmModal);
