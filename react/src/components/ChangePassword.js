import React, { PropTypes } from 'react';
import ReactDom from 'react-dom';

import { Checkbox, FormGroup, ControlLabel } from 'react-bootstrap';
import { zxcvbn } from 'zxcvbn';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';
import PasswordField from 'components/PasswordField';

import 'style/ChangePassword.scss';


let ChangePassword = React.createClass({

  render: function () {

    let form,
        helpCustom = "",
        spinning = false;

    if (this.props.is_fetching) spinning = true;

    if (this.props.choose_custom) {
        form = (<PasswordField user_input={this.props.user_input}
                               entropy={this.props.password_entropy}
                               ref={(field) => {this.pwField = field}}
                               handlePassword={this.props.handlePassword.bind(this)}
                               />);
        helpCustom = (
            <div className='password-format'
                 dangerouslySetInnerHTML={{__html: this.props.l10n('chpass.help-text-newpass')}}>
            </div>);
    } else {
        form = (<TextControl name="suggested_password"
                             label={this.props.l10n('chpass.suggested_password')}
                             componentClass="input"
                             initialValue={this.props.suggested_password}
                             ref={(field) => {this.suggestedPwField = field}}
                             type="text" />);
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
                           ref={(field) => {this.oldPwField = field}}
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
                           onClick={this.props.handleStartPasswordChange.bind(this)}>
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
  password_entropy: PropTypes.number,
}

export default i18n(ChangePassword);





