import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import Checkbox from 'react-bootstrap/lib/Checkbox';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormControl from 'react-bootstrap/lib/FormControl';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

import { zxcvbn } from 'zxcvbn';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';

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
    } else if (values[pwFieldChooser]) {
        const customPw = values[pwFieldCustomName];
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
        const pwFieldCustomErr  = '',
              pwFieldRepeatErr  = '';

        form = (
          <div>
            <FormGroup controlId={pwFieldCustomName}>
              <ControlLabel>
                  {this.props.l10n('pwfield.enter_password')}
              </ControlLabel>
              <Field component={FormControl}
                     componentClass="input"
                     type="password"
                     ref={pwFieldCustomName}
                     name={pwFieldCustomName} />
              <meter max="4"
                     id="password-strength-meter"
                     ref="passwordStrengthMeter">
              </meter>
              <FormControl.Feedback />
              <div className="form-field-error-area">
                <HelpBlock>{pwFieldCustomErr}</HelpBlock>
              </div>
            </FormGroup>
            <FormGroup controlId={pwFieldRepeatName}>
              <ControlLabel>
                  {this.props.l10n('pwfield.repeat_password')}
              </ControlLabel>
              <Field component={FormControl}
                     componentClass="input"
                     type="password"
                     ref={pwFieldRepeatName}
                     name={pwFieldRepeatName} />
              <FormControl.Feedback />
              <div className="form-field-error-area">
                <HelpBlock>{pwFieldRepeatErr}</HelpBlock>
              </div>
            </FormGroup>
          </div>);
        
        helpCustom = (
            <div className='password-format'
                 dangerouslySetInnerHTML={{__html: this.props.l10n('chpass.help-text-newpass')}}>
            </div>);
    } else {
        form = (
        <FormGroup controlId={pwFieldSuggestedName}
                   validationState="success">
          <ControlLabel>{this.props.l10n('chpass.suggested_password')}</ControlLabel>
          
              <Field component={FormControl}
                     componentClass="input"
                     type="text"
                     name={pwFieldSuggestedName}
                     ref={pwFieldSuggestedName}
                     disabled={true} />

              <FormControl.Feedback />
              <div className="form-field-error-area">
                <HelpBlock></HelpBlock>
              </div>
        </FormGroup>);
    }

    return (
          <form id="passwordsview-form"
                role="form">
              <fieldset>
                  <FormGroup controlId={pwFieldOldName}
                             validationState="success">
                      <ControlLabel>{this.props.l10n('chpass.old_password')}</ControlLabel>

                          <Field component={FormControl}
                                 componentClass="input"
                                 type="password"
                                 ref={pwFieldOldName}
                                 name={pwFieldOldName} />
                      <FormControl.Feedback />
                      <div className="form-field-error-area">
                          <HelpBlock></HelpBlock>
                      </div>
                  </FormGroup>

                  <FormGroup controlId={pwFieldChooser}>
                      <ControlLabel>
                        {this.props.l10n('chpass.use-custom-label')}
                      </ControlLabel>
                      <Field component={Checkbox}
                             name={pwFieldChooser}
                             ref={pwFieldChooser}
                             onClick={this.props.handleChoice} />
                      <div className="form-field-error-area">
                        <HelpBlock></HelpBlock>
                      </div>
                  </FormGroup>
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
  state => ({
    initialValues: {pwFieldSuggestedName: state.security.suggested_password},
    enableReinitialize: true
  })
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
