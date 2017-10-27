import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { zxcvbn } from 'zxcvbn';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import TextInput from 'components/EduIDTextInput';

import 'style/ChangePassword.scss';


const pwFieldCustomName    = 'custom-password-field',
      pwFieldRepeatName    = 'repeat-password-field',
      pwFieldOldName       = 'old-password-field',
      pwFieldSuggestedName = 'suggested-password-field',
      pwFieldChooser       = 'choose-custom-field';


const validate = values => {
    const errors = {};
    if (!values[pwFieldOldName]) {
        errors[pwFieldOldName] = 'required'
    } else if (values.choice === 'custom') {



      // XXX Continue here

    const messages = {
      0: this.props.l10n('pwfield.terrible'),
      1: this.props.l10n('pwfield.bad'),
      2: this.props.l10n('pwfield.weak'),
      3: this.props.l10n('pwfield.good'),
      4: this.props.l10n('pwfield.strong')
    }
    const password = this.getCustomPassword(),
          meter = ReactDom.findDOMNode(this.refs.passwordStrengthMeter),
          result = zxcvbn(password, this.props.user_input),
          entropy = Math.log(result.guesses, 2);

    // Update the password strength meter
    let score = 0,
        min_entropy = this.props.entropy / 5,
        step_entropy = min_entropy;
    for (let n=0; n < 5 && entropy > min_entropy; n++){
      score = n;
      min_entropy += step_entropy;
    }


      // XXX Continue here

        if (customPw.length < 5) {
            errors[pwFieldCustomName] = 'weak-password';
        } else if (values[pwFieldRepeatName]) {
            if (values[pwFieldCustomName] !== values[pwFieldRepeatName]) {
                errors[pwFieldRepeatName] = 'different';
            }
        } else {
            errors[pwFieldRepeatName] = 'required';
        }
    }
    return errors;
};


class ChpassForm extends Component {

  render () {

    let form,
        helpCustom = "",
        spinning = false;

    if (this.props.is_fetching) spinning = true;

    if (this.props.choose_custom) {
        const pwFieldCustomErr = '',
              pwFieldRepeatErr = '',
              meterHelpBlock = [(
                    <meter max="4"
                           id="password-strength-meter"
                           key="0"
                           ref="passwordStrengthMeter">
                    </meter>),
                    (<FormControl.Feedback key="1" />),
                    (<div className="form-field-error-area" key="2">
                      <HelpBlock>{pwFieldCustomErr}</HelpBlock>
                    </div>)];

        form = (
          <div>
              <Field component={TextInput}
                     componentClass="input"
                     type="password"
                     ref={pwFieldCustomName}
                     label={this.props.l10n('pwfield.enter_password')}
                     helpBlock={meterHelpBlock}
                     name={pwFieldCustomName} />
              <Field component={TextInput}
                     componentClass="input"
                     type="password"
                     ref={pwFieldRepeatName}
                     label={this.props.l10n('pwfield.repeat_password')}
                     name={pwFieldRepeatName} />
          </div>);
        
        helpCustom = (
            <div className='password-format'
                 dangerouslySetInnerHTML={{__html: this.props.l10n('chpass.help-text-newpass')}}>
            </div>);
    } else {
        form = (<Field component={TextInput}
                       componentClass="input"
                       type="text"
                       name={pwFieldSuggestedName}
                       ref={pwFieldSuggestedName}
                       label={this.props.l10n('chpass.suggested_password')}
                       disabled={true} />);
    }

    return (
          <form id="passwordsview-form"
                role="form">
              <fieldset>
                  <Field component={TextInput}
                         componentClass="input"
                         type="password"
                         ref={pwFieldOldName}
                         label={this.props.l10n('chpass.old_password')}
                         name={pwFieldOldName} />

                  <ControlLabel>
                    {this.props.l10n('chpass.use-custom-label')}
                  </ControlLabel>
                    <ToggleButtonGroup
                         name={pwFieldChooser}
                         type="radio"
                         defaultValue="suggested"
                         onChange={this.props.handleChoice}>
                      <ToggleButton value="custom">
                        {this.props.l10n('chpass.use-custom')}
                      </ToggleButton>
                      <ToggleButton value="suggested">
                        {this.props.l10n('chpass.use-suggested')}
                      </ToggleButton>
                    </ToggleButtonGroup>
                  <div className="form-field-error-area">
                    <HelpBlock></HelpBlock>
                  </div>
                  <Field component="input"
                         type="hidden"
                         name="choice" />
              </fieldset>
              {helpCustom}
              <fieldset>
                  {form}
              </fieldset>
              <fieldset>
                  <EduIDButton className="btn btn-primary"
                               id="chpass-button"
                               spinning={spinning}
                               onClick={this.props.handleStartPasswordChange.bind(this)}
                               disabled={this.props.invalid}>
                            {this.props.l10n('chpass.change-password')}
                  </EduIDButton>
              </fieldset>
          </form>
    );
  }
}

ChpassForm = reduxForm({
  form: 'chpass',
  validate
})(ChpassForm)

ChpassForm = connect(
  state => {
    const choice = state.chpass.choose_custom && 'custom' || 'suggested';
    const initialValues = {
        choice: choice
    };
    initialValues[pwFieldSuggestedName] = state.chpass.suggested_password;
    return {
      initialValues: initialValues,
      enableReinitialize: true
    }
  }
)(ChpassForm)

class ChangePassword extends Component {

  render () {

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

          <ChpassForm {...this.props} />
        </div>
      </div>
    );
  }
}

ChangePassword.propTypes = {
  is_fetching: PropTypes.bool,
  choose_custom: PropTypes.bool,
  user_input: PropTypes.array,
  next_url: PropTypes.string,
  errorMsg: PropTypes.string,
  password_entropy: PropTypes.number,
  handlePassword: PropTypes.func,
  handleChoice: PropTypes.func,
  handleStartPasswordChange: PropTypes.func,
}

export default i18n(ChangePassword);
