
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/lib/Button';
import Modal from "react-bootstrap/lib/Modal";

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import NotificationsContainer from 'containers/Notifications';


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

                <Modal.Body>
                    <NotificationsContainer />
                    <div id="delete-account">
                        <p>{this.props.l10n('security.modal_info')}</p>
                        <p>{this.props.l10n('security.modal_notes')}</p>
                         <EduIDButton className="btn btn-danger btn-default"
                              id="confirm-delete-account-button"
                              ref={(button) => {this.deleteButton = button}}
                              spinning={spinning}
                              onClick={this.props.handleConfirm} >
                            {this.props.l10n('security.confirm_button')}
                        </EduIDButton>
                    </div>
                </Modal.Body>
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
