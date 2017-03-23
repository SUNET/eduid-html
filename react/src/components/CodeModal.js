
import React, { PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import EduiDAlert from 'components/EduIDAlert';


let CodeModal = React.createClass({

  render: function () {
    let spinning = false;
    let msgid, msg, alertElem;
    if (this.props.is_fetching) spinning = true;

    if (this.props.failed) {
      msg= this.props.error;
      alertElem = ( <EduiDAlert levelMessage="danger" Msg={msg}></EduiDAlert> );
    }

    return (
      <div id="ninConfirmDialog"
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
                    <div className="modal-text">
                    {this.props.content_text_first}
                    <br/><br/>
                    {this.props.content_text_second}
                    <div id="nin-confirmation-code">
                        <TextControl name={this.props.inputId}
                                     placeholder={this.props.placeholder}
                                     componentClass='input'
                                     type='text' />
                    </div>
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
});

CodeModal.propTypes = {
  title: PropTypes.object,
  placeholder: PropTypes.string,
  handleConfirm: PropTypes.func,
  confirming: PropTypes.string,
  closeModal: PropTypes.func,
  showModal: PropTypes.bool,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool,
  failed: PropTypes.bool,
}

export default i18n(CodeModal);
