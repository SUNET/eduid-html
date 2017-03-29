import React, { PropTypes } from 'react';

import { Checkbox, FormGroup, ControlLabel } from 'react-bootstrap';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';

import 'style/ChangePassword.scss';


let ChangePassword = React.createClass({


  validateCustomPass: function () {},
  validateSuggestedPass: function () {},

  render: function () {
    let form = (<FormGroup controlId="custom-password-form"
                           validationState={this.validateSuggestedPass()}>
                  <TextControl name="suggested_password"
                           label={this.props.l10n('chpass.suggested_password')}
                           componentClass="input"
                           value={this.props.suggested_password}
                           type="text" />
                </FormGroup>);
    if (this.props.choose_custom) {
        form = (<FormGroup controlId="custom-password-form"
                           validationState={this.validateCustomPass()}>
                  <TextControl name="custom_password"
                               label={this.props.l10n('chpass.custom_password')}
                               componentClass="input"
                               type="text" />

                  <TextControl name="custom_password_repeat"
                               label={this.props.l10n('chpass.repeat_password')}
                               componentClass="input"
                               type="text" />
                </FormGroup>);
    }
    return (
        <div id="changePasswordDialog"
             className="well">

            <p>
            {this.props.l10n('chpass.help-text-general')}
            </p>

            <div className='password-format'>
            {this.props.l10n('chpass.help-text-newpass')}
            </div>


          <form id="passwordsview-form"
                className="form-horizontal"
                role="form">
            <fieldset id="chpass-form-fieldset" className="tabpane">

              <TextControl name="old_password"
                           label={this.props.l10n('chpass.old_password')}
                           componentClass="input"
                           type="text" />

              <FormGroup controlId="use-custom-password">
                  <ControlLabel>
                    {this.props.l10n('chpass.use-custom-label')}
                  </ControlLabel>
                  <Checkbox onClick={this.props.handleChoice} />
              </FormGroup>
              {form}
            </fieldset>
          </form>
        </div>
    );
  }
});

ChangePassword.propTypes = {
  choose_custom: PropTypes.bool,
  errorMsg: PropTypes.string,
}

export default i18n(ChangePassword);

