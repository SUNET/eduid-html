
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import ConfirmModal from 'components/ConfirmModal';

import 'style/LetterProofing.scss';


class LetterProofingButton extends Component {

  render () {
    let spinning = false;

    if (this.props.is_fetching) spinning = true;

    let message = '',
        messageArgs = {},
        levelMessage = 'success';

    if (this.props.letter_sent) {
        message = 'letter.letter_sent_msg';
        messageArgs = {letter_sent: this.props.letter_sent,
                       letter_expires: this.props.letter_expires};
        levelMessage = 'success';
    } else if (this.props.resending.failed) {
        message = this.props.resending.message;
        messageArgs = {};
        levelMessage = 'error';
    }

    return (
        <div>
          <form id="letter-proofing-form"
                className="form-horizontal"
                role="form">
            <fieldset id="letter-proofing">
              <span className="error-msg text-danger">{this.props.errorMsg}</span>
              <br />
              <EduIDButton bsStyle="primary"
                      spinning={spinning}
                      onClick={this.props.handleLetterProofing}>
                {this.props.l10n('letter.letter_button_text')}
              </EduIDButton>
            </fieldset>
          </form>
          <ConfirmModal
                modalId="letterConfirmDialog"
                inputId="letterConfirmDialogControl"
                title={this.props.l10n('letter.confirm_title')}
                resendHelp={this.props.l10n('letter.lost_code')}
                resendText={this.props.l10n('letter.resend_code')}
                placeholder={this.props.l10n('letter.placeholder')}
                showModal={this.props.confirmingLetter}
                closeModal={this.props.handleStopConfirmationLetter}
                handleResend={this.props.handleConfirmationLetter}
                handleConfirm={this.props.sendConfirmationLetter}
                is_fetching={this.props.resending.is_fetching}
                message={message}
                messageArgs={messageArgs}
                LevelMessage={levelMessage} />
        </div>
    );
  }
}

LetterProofingButton.propTypes = {
  letter_sent: PropTypes.string,
  letter_expires: PropTypes.string,
  resending: PropTypes.object,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool,
  confirmingLetter: PropTypes.bool,
  sendConfirmationLetter: PropTypes.func,
  handleLetterProofing: PropTypes.func,
  handleStopConfirmationLetter: PropTypes.func,
  handleConfirmationLetter: PropTypes.func
}

export default i18n(LetterProofingButton);
