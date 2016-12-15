
import React, { PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import _ from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';


let ConfirmModal = React.createClass({

  render: function () {

    let spinning = false,
        msgid, msg, alertElem;

    if (this.props.is_fetching) spinning = true;
    if (this.props.resending.is_fetching) spinning = true;
    if (this.props.resending.failed) {
      msg= _.getMsg(this.props.resending.error.form);
      alertElem = ( <Alert bsStyle="danger">{msg}</Alert> );
    }
    if (this.props.resending.message) {
      msg = _.getMsg(this.props.resending.message, {email: this.props.confirming});
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
                        {_.getMsg('cm.lost_code')}
                        <a href="#" onClick={this.props.handleResendCode}
                           className="resend-code">
                            {_.getMsg('cm.resend_code')}
                        </a>
                        </HelpBlock>
                    </FormGroup>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="finish-button">
                         {_.getMsg('cm.finish')}
                    </Button>
                    <Button className="cancel-button"
                            onClick={this.props.closeModal}>
                         {_.getMsg('cm.cancel')}
                    </Button>
                    <EduIDButton bsStyle="primary"
                          className="ok-button"
                          spinning={spinning}
                          onClick={this.props.handleConfirm}>
                        {_.getMsg('cm.ok')}
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

export default ConfirmModal;
