import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDom from 'react-dom';
import zxcvbn from 'zxcvbn';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import i18n from 'i18n-messages';
import * as actions from 'actions/ChangePassword'

import 'style/PasswordField.scss';


class PasswordField extends Component{
  constructor(props){
    super(props);
    this.handleCustomChange = this.handleCustomChange.bind(this);
    this.handleRepeatChange = this.handleRepeatChange.bind(this);
    this.state = {
      warningCustom: '',
      warningRepeat: '',
      customValidationState:'success',
      repeatValidationState:'success',
      customReady: false,
      repeatReady: false
    };
  }

  validPassword(){
    return this.state.customReady && this.state.repeatReady
  }

  getCustomPassword(){
    const password = ReactDom.findDOMNode(this.refs.password);
    return password.value.split(' ').join('');
  }

  getRepeatPassword(){
    const repeated = ReactDom.findDOMNode(this.refs.password_repeat);
    return repeated.value.split(' ').join('');
  }

  handleCustomChange(event){
    event.preventDefault();
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
    meter.value = score;

    // set validation state and Update the text indicator
    let customState = 'success',
        customReady = true;
    if (this.props.entropy > entropy) {
      customState = 'error';
      customReady = false;
    }
    this.setState({
      warningCustom: messages[score],
      customValidationState: customState,
      customReady: customReady
    });
    this.checkValid(customReady, this.state.repeatReady);
  }

  handleRepeatChange(event){
    event.preventDefault();
    const password = this.getCustomPassword(),
          repeated = this.getRepeatPassword();
    let repeatState = 'success',
        repeatReady = true,
        warningRepeat = '';
    if (password !== repeated) {
      repeatState = 'error';
      repeatReady = false;
      warningRepeat = this.props.l10n('pwfield.repeat_different');
    }
    this.setState({
      repeatValidationState: repeatState,
      repeatReady: repeatReady,
      warningRepeat: warningRepeat
    });
    this.checkValid(this.state.customReady, repeatReady);
  }

  checkValid(custom, repeat) {
    if (custom && repeat) {
      this.props.handlePassword(this.getCustomPassword());
    } else {
      this.props.handlePassword('');
    }
  }

  render(){
    let { label, label_repeat } = this.props;
    label = (label) ? label : this.props.l10n('pwfield.enter_password');
    label_repeat = (label_repeat) ? label_repeat : this.props.l10n('pwfield.repeat_password');
    return(
      <div>
        <FormGroup controlId="customPassword"
                   validationState={this.state.customValidationState}>
          <ControlLabel>
            {label}
          </ControlLabel>
          <FormControl componentClass="input"
                       type="password"
                       ref="password"
                       name={this.props.name}
                       id={this.props.name}
                       onChange={this.handleCustomChange}>
          </FormControl>
          <meter max="4"
                 id="password-strength-meter"
                 ref="passwordStrengthMeter">
          </meter>
          <p id="password-strength-text" ref="passwordStrengthText">
              <span className="help-block feedback">{this.state.warningCustom}</span>
          </p>
          <FormControl.Feedback />
        </FormGroup>
        <FormGroup controlId="customRepeat"
                   validationState={this.state.repeatValidationState}>
          <ControlLabel>
            {label_repeat}
          </ControlLabel>
          <FormControl componentClass="input"
                       type="password"
                       ref="password_repeat"
                       name={this.props.name_repeat}
                       id={this.props.name_repeat}
                       onChange={this.handleRepeatChange}>
          </FormControl>
          <p id="password-repeat-text" ref="passwordRepeatText">
              <span className="help-block feedback">{this.state.warningRepeat}</span>
          </p>
          <FormControl.Feedback />
        </FormGroup>
      </div>);
  }
}

PasswordField.propTypes = {
  name: PropTypes.string,
  name_repeat: PropTypes.string,
  label: PropTypes.string,
  label_repeat: PropTypes.string,
  entropy: PropTypes.number,
  user_input: PropTypes.array,
  onChange: PropTypes.func,
  handleValidPw: PropTypes.func,
}

export default i18n(PasswordField);
