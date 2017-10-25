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
import PasswordField from 'components/PasswordField';

import 'style/ChangePassword.scss';


const validate = values => {
    const errors = {};
    return errors;
};


let ChpassForm = props => {

    let form,
        helpCustom = "",
        spinning = false;

    if (props.is_fetching) spinning = true;

    if (props.choose_custom) {
        form = (<PasswordField user_input={props.user_input}
                               entropy={props.password_entropy}
                               ref={(field) => {pwField = field}}
                               handlePassword={props.handlePassword.bind(this)}
                               name="custom-password-field-one"
                               name_repeat="custom-password-field-two"
                               />);
        helpCustom = (
            <div className='password-format'
                 dangerouslySetInnerHTML={{__html: props.l10n('chpass.help-text-newpass')}}>
            </div>);
    } else {
        form = (
        <FormGroup controlId="suggested_password"
                   validationState="success">
          <ControlLabel>{props.l10n('chpass.suggested_password')}</ControlLabel>
          
              <FormControl componentClass="input"
                           type="text"
                           ref="password"
                           name="suggested_password"
                           value={props.suggested_password}
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
                  <FormGroup controlId="old_password"
                             validationState="success">
                      <ControlLabel>{props.l10n('chpass.old_password')}</ControlLabel>

                      <FormControl componentClass="input"
                                   type="password"
                                   ref={(field) => {oldPwField = field}}
                                   name="old_password" />
                      <FormControl.Feedback />
                      <div className="form-field-error-area">
                          <HelpBlock></HelpBlock>
                      </div>
                  </FormGroup>

                  <FormGroup controlId="use-custom-password">
                      <ControlLabel>
                        {props.l10n('chpass.use-custom-label')}
                      </ControlLabel>
                      <Checkbox onClick={props.handleChoice} />
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
                               onClick={props.handleStartPasswordChange.bind(this)}>
                            {props.l10n('chpass.change-password')}
                  </EduIDButton>
              </fieldset>
          </form>
    );
}

ChpassForm = reduxForm({
  form: 'chpass',
  validate
})(ChpassForm)

ChpassForm = connect(
  state => ({
    initialValues: {suggested_password: state.security.suggested_password},
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
