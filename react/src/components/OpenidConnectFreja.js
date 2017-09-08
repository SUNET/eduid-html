
import React, { PropTypes } from 'react';
import withUserAgent from 'react-useragent';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import { ButtonGroup, Button, Modal, HelpBlock, Alert, FormGroup, Well, } from 'react-bootstrap';

//  XXX this interferes with the bootstrap in eduid-html
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/OpenidConnect.scss';


function getErrorMessage(errorObj, optionalKeys) {
  /*
  Loop through the error object in search for known keys that hold error messages.
  The order is optionalKeys before commonKeys.
  */
  let commonKeys = ['l10n_message', 'message', 'csrf_token'];
  let keys = optionalKeys || [];
  keys = keys.concat(commonKeys);
  for (let key of keys)  {
    for (let objKey of Object.keys(errorObj)) {
      if (Object.is(key, objKey)) {
        return errorObj[key]
      }
    }
  }
  return 'Missing error message'
}

let OpenidConnectFreja = React.createClass({

  render: function () {
    // Wait for config to load before rendering, is there a better way?
    try {
      if (!this.props.proofing_methods.includes('oidc_freja')) {
        // Do not render anything
        return null
      }
    } catch (e) {
      if (e instanceof TypeError) {
       return null
      }
    }

    const supportedDevices = ['AndroidOS', 'iOS'];
    const isMobile = supportedDevices.includes(this.props.ua.os);
    const freja_instructions = (
      <Well id="openid-connect-freja-instructions">
        <ol>
          <li>{this.props.l10n('ocf.freja_instructions_step_1')}</li>
          <li>{this.props.l10n('ocf.freja_instructions_step_2')}</li>
          <li>{this.props.l10n('ocf.freja_instructions_step_3')}</li>
          <li>{this.props.l10n('ocf.freja_instructions_step_4')}</li>
          <li>{this.props.l10n('ocf.freja_instructions_step_5')}</li>
        </ol>
      </Well>
    );

    let spinning = false, validationState = null, alertElem, errorElem, notOnMobileMsg, frejaButton, showModalButton, buttonGroup;
    if (this.props.is_fetching) spinning = true;
    if (this.props.error) {
      let errorMsg = getErrorMessage(this.props.error, ['nin']);
      alertElem = <Alert bsStyle="warning">{this.props.l10n(errorMsg)}</Alert>;
      errorElem = <HelpBlock>{this.props.l10n(errorMsg)}</HelpBlock>;
      validationState = "error"
    }

    if (!isMobile) {
      notOnMobileMsg = (
        <div id="openid-connect-freja-not-on-mobile">
          <h4>{this.props.l10n('ocf.not_on_mobile_title')}</h4>
          <p>{this.props.l10n('ocf.not_on_mobile_message')}</p>
        </div>
      );
    } else {
      frejaButton = (
          <EduIDButton bsStyle="link"
                       spinning={spinning}
                       onClick={this.props.handleInitializeFrejaProofing}>
            {this.props.l10n('ocf.open_app')}
            </EduIDButton>
      );
      if (this.props.iaRequestData) {
        frejaButton = (
          <EduIDButton bsStyle="link"
                       spinning={spinning}
                       href={"frejaeid://identify?iaRequestData=" + this.props.iaRequestData}>
            {this.props.l10n('ocf.open_app')}
            </EduIDButton>
        );
      }
      buttonGroup = (
        <ButtonGroup vertical block>
          <Button bsStyle="link"
                  href="https://frejaeid.com/skaffa-freja-eid/"
                  target="_blank">
            {this.props.l10n('ocf.freja_instructions_install_link')}
          </Button>

          <span className="help-block" id="alert">
                  {alertElem}
                </span>
          {frejaButton}
        </ButtonGroup>
      )
    }

    showModalButton = (
      <Button bsStyle="primary"
              id="openid-connect-freja-show-modal"
              onClick={this.props.handleShowModal}>
            {this.props.l10n('ocf.initialize_proofing')}
      </Button>
    );

    return (
      <div>
        <div id="openid-connect-freja-info-dialog"
             tabIndex="-1"
             role="dialog"
             aria-labelledby="askDialogPrompt"
             aria-hidden="true"
             data-backdrop="true">


          <Modal show={this.props.showModal} id="openid-connect-freja-modal">
            <Modal.Header>
              <Modal.Title>{this.props.l10n('ocf.modal_title')}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <h4>{this.props.l10n('ocf.freja_instructions_title')}</h4>
              {freja_instructions}
              {buttonGroup || notOnMobileMsg}
            </Modal.Body>

            <Modal.Footer>
              <Button className="finish-button"
                      id="openid-connect-freja-hide-modal"
                      onClick={this.props.handleHideModal}>
                {this.props.l10n('cm.close')}
              </Button>
            </Modal.Footer>

          </Modal>
        </div>
        <FormGroup validationState={validationState}>
          {errorElem}
          {showModalButton}
        </FormGroup>
      </div>
    );
  }
});

OpenidConnectFreja.propTypes = {
  iaRequestData: PropTypes.string,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool,
  handleInitializeFrejaProofing: PropTypes.func,
  handleShowModal: PropTypes.func,
  handleHideModal: PropTypes.func,
  showModal: PropTypes.bool,
  nin: PropTypes.string,
};

export default withUserAgent(i18n(OpenidConnectFreja));
