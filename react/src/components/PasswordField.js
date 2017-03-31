import React, {Component,PropTypes} from 'react';
import ReactDom from 'react-dom';
import zxcvbn from 'zxcvbn';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


class PasswordField extends Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      resultScore: '',
      warning: '',
      suggestions:''
    };
  }

  handleChange(event){
    event.preventDefault();
    let { strength } = this.props;
    strength = (strength) ? strength : {
      0: "Worst ☹",
      1: "Bad ☹",
      2: "Weak ☹",
      3: "Good ☺",
      4: "Strong ☻"
    }

    const password = ReactDom.findDOMNode(this.refs.password);
    const meter = ReactDom.findDOMNode(this.refs.passwordStrengthMeter);
    const text = ReactDom.findDOMNode(this.refs.passwordStrengthText);

    let val = password.value;
    let result = zxcvbn(val);

    // Update the password strength meter
    meter.value = result.score;

    // Update the text indicator
    if(val !== "") {
        this.setState({
          resultScore:strength[result.score],
          warning:result.feedback.warning,
          suggestions:result.feedback.suggestions
        });
    }
    else {
      this.setState({
        resultScore:'',
        warning:'',
        suggestions:''
      })
    }

    if(typeof this.props.onChange === 'function'){
      this.props.onChange(event);
    }
  }

  handleChangeRepeat(event){}
  getValidationState(event){}

  render(){
    let { label } = this.props;
    let { label_repeat } = this.props;
    label = (label) ? label : 'Enter Password';
    label_repeat = (label_repeat) ? label_repeat : 'Repeat Password';
    const {resultScore,warning,suggestions} = this.state;
    return(
        <FormGroup controlId={this.props.name}
                   validationState={this.getValidationState()}>
          <ControlLabel>
            {label}
          </ControlLabel>);
          <FormControl componentClass="input"
                       type="password"
                       inputRef={() => { this.input = 'password'; }}
                       name={this.props.name}
                       id={this.props.name}
                       onChange={this.handleChange}>
          </FormControl>
          <meter max="4"
                 id="password-strength-meter"
                 ref="passwordStrengthMeter">
          </meter>
          <p id="password-strength-text" ref="passwordStrengthText">
            {resultScore &&
              "Strength: "}
              <strong>
                {resultScore}
              </strong>
              <span className="feedback">{warning + " " + suggestions}</span>
          </p>
          <ControlLabel>
            {label_repeat}
          </ControlLabel>
          <FormControl componentClass="input"
                       type="password"
                       inputRef={() => { this.input = 'password_repeat'; }}
                       name={this.props.name_repeat}
                       id={this.props.name_repeat}
                       onChange={this.handleChangeRepeat}>
          </FormControl>
          <FormControl.Feedback className=""/>
        </FormGroup>);
  }
}

PasswordField.propTypes = {
  name: PropTypes.string,
  name_repeat: PropTypes.string,
  label: PropTypes.string,
  label_repeat: PropTypes.string,
  strength: React.PropTypes.object,
  onChange: React.PropTypes.func,
}

export default PasswordField;
