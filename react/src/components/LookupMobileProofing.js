
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EduIDButton from 'components/EduIDButton';

import 'style/LookupMobileProofing.scss';


class LookupMobileProofing extends Component {

  render () {
    let spinning = false;
    if (!this.props.disabled && this.props.is_fetching) spinning = true;
    let errorMsg = '';
    if (this.props.errorMsg) {
        errorMsg = [(<span className="error-msg text-danger">
                      {this.props.l10n(this.props.errorMsg)}
                    </span>),
                    (<br />)];
    }

    return (
        <div>
          <form id="lookup-mobile-proofing-form"
                className="form-horizontal"
                role="form">
            <fieldset id="lookup-mobile-proofing">
              {errorMsg}
              <EduIDButton bsStyle="primary"
                      spinning={spinning}
                      disabled={this.props.disabled}
                      onClick={this.props.handleLookupMobile}>
                    {this.props.l10n('lmp.confirm-lookup-mobile')}
              </EduIDButton>
            </fieldset>
          </form>
        </div>
    );
  }
}

LookupMobileProofing.propTypes = {
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool,
  disabled: PropTypes.bool,
  handleLookupMobile: PropTypes.func
}

export default LookupMobileProofing;

