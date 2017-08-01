
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import EduiDAlert from 'components/EduIDAlert';


class GenericConfirmModal extends Component {

  render () {

    return (
      <div id={this.props.modalId}
           tabIndex="-1"
           role="dialog"
           aria-hidden="true"
           data-backdrop="true">

            <Modal show={this.props.showModal}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div>
                        <p>{this.props.mainText}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <EduIDButton bsStyle="primary"
                          className="ok-button"
                          onClick={this.props.acceptModal} >
                        {this.props.l10n('cm.accept')}
                    </EduIDButton>
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

GenericConfirmModal.propTypes = {
  modalId: PropTypes.string,
  title: PropTypes.any,
  mainText: PropTypes.any,
  handleRemove: PropTypes.func,
  closeModal: PropTypes.func,
  acceptModal: PropTypes.func,
  showModal: PropTypes.bool,
  is_fetching: PropTypes.bool,
  confirming: PropTypes.bool,
}

export default i18n(GenericConfirmModal);
