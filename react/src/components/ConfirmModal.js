
import React, { PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';


let ConfirmModal = React.createClass({

  render: function () {

    let spinning = false,
        msgid, msg, alertElem;

    if (this.props.is_fetching) spinning = true;
    if (this.props.resending.is_fetching) spinning = true;
    if (this.props.resending.failed) {
      msg= this.props.l10n(this.props.resending.error.form);
      alertElem = ( <Alert bsStyle="danger">{msg}</Alert> );
    }
    if (this.props.resending.message) {
      msg = this.props.l10n(this.props.resending.message, {email: this.props.confirming});
      alertElem = ( <Alert bsStyle="warning">{msg}</Alert> );
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
                    {alertElem}
                    <FormGroup controlId="emailConfirmDialogInput"
                               bsSize="small">
                        <FormControl name="xlInput"
                                     type="text"
                                     placeholder={this.props.placeholder} />
                        <FormControl.Feedback />
                        <HelpBlock>
                        {this.props.l10n('cm.lost_code')}
                        <a href="#" onClick={this.props.handleResendCode}
                           className="resend-code">
                            {this.props.l10n('cm.resend_code')}
                        </a>
                        </HelpBlock>
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="finish-button">
                         {this.props.l10n('cm.finish')}
                    </Button>
                    <Button className="cancel-button"
                            onClick={this.props.closeModal}>
                         {this.props.l10n('cm.cancel')}
                    </Button>
                    <EduIDButton bsStyle="primary"
                          className="ok-button"
                          spinning={spinning}
                          onClick={this.props.handleConfirm}>
                        {this.props.l10n('cm.ok')}
                    </EduIDButton>
                </Modal.Footer>

            </Modal>
      </div>
    );
  }
});

ConfirmModal.propTypes = {
  title: PropTypes.object,
  placeholder: PropTypes.string,
  handleConfirm: PropTypes.func,
  confirming: PropTypes.string,
  resending: PropTypes.object,
  handleResendCode: PropTypes.func,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool
}

export default i18n(ConfirmModal);
