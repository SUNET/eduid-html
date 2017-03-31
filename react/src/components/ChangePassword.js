import React, { PropTypes } from 'react';

import { Checkbox, FormGroup, ControlLabel } from 'react-bootstrap';
import { zxcvbn } from 'zxcvbn';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import PasswordField from 'components/PasswordField';

import 'style/ChangePassword.scss';


let ChangePassword = React.createClass({

  componentDidMount: function () {
    let pwbar_options = {
      ui: {
        //verdicts: ["Too weak", "Halfway", "Almost", "Strong"],
        showVerdicts: false,
        scores: [this.props.password_entropy * 0.25,
                 this.props.password_entropy * 0.5,
                 this.props.password_entropy * 0.75,
                 this.props.password_entropy],
        bootstrap2: false
      },
      common: {
        zxcvbn: true,
        usernameField: 'eduid'   // make zxcvbn give negative score to the word eduID
      }
    };

    // Set up triggers on change events
    var triggers = "change focusout keyup onpaste paste mouseleave";
    // this.props.get_input('repeated_password').on(triggers, this.props.checkRepeatedPassword);
  },

  render: function () {

    let form, helpCustom,
        spinning = false;

    if (this.props.is_fetching) spinning = true;

    if (this.props.choose_custom) {
        form = (<PasswordField />);
        helpCustom = (
            <div className='password-format'
                 dangerouslySetInnerHTML={{__html: this.props.l10n('chpass.help-text-newpass')}}>
            </div>);
    } else {
        form = (<TextControl name="suggested_password"
                             label={this.props.l10n('chpass.suggested_password')}
                             componentClass="input"
                             initialValue={this.props.suggested_password}
                             type="text" />);
        helpCustom = "";
    }

    return (
      <div>
        <h3>
            {this.props.l10n('chpass.title-general')}
        </h3>

        <div id="changePasswordDialog"
             className="well">

            <p>
            {this.props.l10n('chpass.help-text-general')}
            </p>

          {helpCustom}

          <form id="passwordsview-form"
                role="form">

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
              <EduIDButton className="btn btn-primary"
                           id="chpass-button"
                           spinning={spinning}
                           onClick={this.props.handleStartPasswordChange}>
                        {this.props.l10n('chpass.change-password')}
              </EduIDButton>
          </form>
        </div>
      </div>
    );
  }
});

ChangePassword.propTypes = {
  choose_custom: PropTypes.bool,
  errorMsg: PropTypes.string,
}

export default i18n(ChangePassword);





