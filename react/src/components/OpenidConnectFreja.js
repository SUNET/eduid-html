
import React, { PropTypes } from 'react';
import withUserAgent from 'react-useragent';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import { ButtonGroup, Button, Modal, HelpBlock, Alert, ListGroup, ListGroupItem, Well, } from 'react-bootstrap';

//  XXX this interferes with the bootstrap in eduid-html
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/OpenidConnect.scss';


let OpenidConnectFreja = React.createClass({

  render: function () {
    const supportedDevices = ['AndroidOS', 'iOS'];
    const isMobile = supportedDevices.includes(this.props.ua.os);
    const freja_instructions = (
      <Well>
        <ol>
          <li>{this.props.l10n('ocf.freja_instructions_step_1')}</li>
          <li>{this.props.l10n('ocf.freja_instructions_step_2')}</li>
          <li>{this.props.l10n('ocf.freja_instructions_step_3')}</li>
          <li>{this.props.l10n('ocf.freja_instructions_step_4')}</li>
        </ol>
      </Well>
    );

    let spinning = false, alertElem, errorElem, notOnMobileMsg, frejaButton, buttonGroup;
    if (this.props.is_fetching) spinning = true;
    if (this.props.errorMsg) {
      alertElem = <Alert bsStyle="warning">{this.props.l10n(this.props.errorMsg)}</Alert>;
      errorElem = <HelpBlock validationState="error">{this.props.l10n(this.props.errorMsg)}</HelpBlock>;
    }

    if (!isMobile) {
      notOnMobileMsg = (
        <div id="openid-connect-freja-tip">
          <h4>{this.props.l10n('ocf.not_on_mobile_title')}</h4>
          <p>{this.props.l10n('ocf.not_on_mobile_message')}</p>
        </div>
      );
    } else {
      frejaButton = (
          <EduIDButton bsStyle="link btn-large"
                       spinning={spinning}
                       onClick={this.props.handleInitializeFrejaProofing}>
            {this.props.l10n('ocf.open_app')}
            </EduIDButton>
      );
      if (this.props.iaRequestData) {
        frejaButton = (
          <EduIDButton bsStyle="link btn-large"
                       spinning={spinning}
                       href={"frejaeid://identify?iaRequestData=" + this.props.iaRequestData}>
            {this.props.l10n('ocf.open_app')}
            </EduIDButton>
        );
      }
      buttonGroup = (
        <ButtonGroup vertical block>
          <Button bsStyle="link btn-large"
                  href="https://www.verisec.com/sv/autentisering/frejaeid/"
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

    return (
      <div>
        <div id="frejaInfoDialog"
             tabIndex="-1"
             role="dialog"
             aria-labelledby="askDialogPrompt"
             aria-hidden="true"
             data-backdrop="true">


          <Modal show={this.props.showModal}>
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
                      onClick={this.props.handleHideModal}>
                {this.props.l10n('cm.close')}
              </Button>
            </Modal.Footer>

          </Modal>
        </div>
        {errorElem}
        <Button bsStyle="primary"
                onClick={this.props.handleShowModal}>
          {this.props.l10n('ocf.initialize_proofing')}
          </Button>
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
