
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';

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
              </EduIDButton>
            </fieldset>
          </form>
        </div>
    );
  }
}

LetterProofingButton.propTypes = {
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool,
  handleLetterProofing: PropTypes.func
}

export default i18n(LetterProofingButton);
