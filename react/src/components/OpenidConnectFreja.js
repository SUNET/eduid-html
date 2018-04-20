
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withUserAgent from 'react-useragent';

import EduIDButton from 'components/EduIDButton';
import NotificationsContainer from 'containers/Notifications';

import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import Well from 'react-bootstrap/lib/Well';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import 'style/OpenidConnect.scss';


class OpenidConnectFreja extends Component {

  render () {
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

    let spinning = false, notOnMobileMsg, frejaButton, showModalButton, buttonGroup;
    if (this.props.is_fetching) spinning = true;

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

          {frejaButton}
        </ButtonGroup>
      )
    }

    showModalButton = (
      <EduIDButton bsStyle="primary"
              id="openid-connect-freja-show-modal"
              onClick={this.props.handleShowModal}
              block>
            {this.props.l10n('ocf.initialize_proofing')}
      </EduIDButton>
    );

    return (
      <div>
        <form id="openid-connect-freja-form"
              className="form-horizontal"
              role="form">
          <fieldset id="openid-connect-freja">
            {showModalButton}
            <HelpBlock>{this.props.l10n('ocf.initialize_proofing_help_text')}</HelpBlock>
          </fieldset>
        </form>

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
              <NotificationsContainer />
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
      </div>
    );
  }
}

OpenidConnectFreja.propTypes = {
  iaRequestData: PropTypes.string,
  is_fetching: PropTypes.bool,
  handleInitializeFrejaProofing: PropTypes.func,
  handleShowModal: PropTypes.func,
  handleHideModal: PropTypes.func,
  showModal: PropTypes.bool,
  nin: PropTypes.string,
};

export default withUserAgent(OpenidConnectFreja);
