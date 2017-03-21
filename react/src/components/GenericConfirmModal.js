
import React, { PropTypes } from 'react';
import { Button, Modal, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import EduiDAlert from 'components/EduIDAlert';


let GenericConfirmModal = React.createClass({

  render: function () {
    let spinning = false;
    // if (this.props.is_fetching) spinning = true;
    // if (this.props.resending.is_fetching) spinning = true;

    return (
      <div id="securityConfirmDialog"
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
                    <div id="delete-account">
                        <p>{this.props.l10n('security.change_info')}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <EduIDButton bsStyle="primary"
                          className="ok-button"
                          spinning={spinning}
                          onClick={this.props.finishModal} >
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
});

GenericConfirmModal.propTypes = {
  title: PropTypes.object,
  handleRemove: PropTypes.func,
  closeModal: PropTypes.func,
  finishModal: PropTypes.func,
  showModal: PropTypes.bool,
  is_fetching: PropTypes.bool,
  confirming: PropTypes.bool,
}

export default i18n(GenericConfirmModal);
