
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import EduiDAlert from 'components/EduIDAlert';

const ModalBody = Modal.Body;

class DeleteModal extends Component {

  render () {
    let spinning = false;
    // if (this.props.is_fetching) spinning = true;
    // if (this.props.resending.is_fetching) spinning = true;

    return (
      <div id="securityDeleteDialog"
           tabIndex="-1"
           role="dialog"
           aria-labelledby="askDialogPrompt"
           aria-hidden="true"
           data-backdrop="true">

            <Modal show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <ModalBody>
                    <div id="delete-account">
                        <p>{this.props.l10n('security.modal_info')}</p>
                        <p>{this.props.l10n('security.modal_notes')}</p>
                         <EduIDButton className="btn btn-danger btn-default"
                              id="confirm-delete-account-button"
                              spinning={spinning}
                              onClick={this.props.handleConfirm} >
                            {this.props.l10n('security.confirm_button')}
                        </EduIDButton>
                    </div>
                </ModalBody>
                <Modal.Footer>
                    <Button className="cancel-button"
                            onClick={this.props.closeModal} >
                         {this.props.l10n('cm.cancel')}
                    </Button>
                </Modal.Footer>

            </Modal>
      </div>
    );
  }
}

DeleteModal.propTypes = {
  title: PropTypes.any,
  showModal: PropTypes.bool,
  closeModal: PropTypes.func,
  handleConfirm: PropTypes.func,
  is_fetching: PropTypes.bool,
}

export default i18n(DeleteModal);
