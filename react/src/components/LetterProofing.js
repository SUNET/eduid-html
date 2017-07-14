
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
                title={this.props.l10n('letter.confirm_title')}
                resendHelp={this.props.l10n('letter.lost_code')}
                resendText={this.props.l10n('letter.resend_code')}
                placeholder={this.props.l10n('letter.placeholder')}
                showModal={this.props.confirmingLetter}
                finishModal={this.props.handleStopConfirmationLetter}
                closeModal={this.props.handleStopConfirmationLetter}
                handleResendCode={this.props.handleConfirmationLetter}
                handleConfirm={this.props.sendConfirmationLetter}
                resending={this.props.resending}
                confirming={this.props.nin} />
        </div>
    );
  }
}

LetterProofingButton.propTypes = {
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool,
  confirmingLetter: PropTypes.bool,
  handleLetterProofing: PropTypes.func,
  handleStopConfirmationLetter: PropTypes.func,
  handleConfirmationLetter: PropTypes.func
}

export default i18n(LetterProofingButton);
