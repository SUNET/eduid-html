import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


const TextControl = React.createClass({

  getInitialState: function () {
    return { value: '' };
  },

  getValidationState: function () {
    if (this.props.validation !== undefined) {
      return this.props.validation(this.state.value);
    } else {
      return "success";
    }
  },

  handleChange: function (e) {
    this.setState({ value: e.target.value });
    if (this.props.handleChange !== undefined) {
      this.props.handleChange(e);
    }
  },

  render: function () {
    let children, label, help, options;
    if ((this.props.componentClass === 'select') &&
        (this.props.options)) {
      options = this.props.options.slice();
      options.unshift(["None", "Choose language"]);
      children = options.map(opt => {
        return (<option key={opt[0]}
                        value={opt[0]}>
                  {opt[1]}
                </option>);
      }, this);
    }
    if (this.props.label) {
        label = (
          <ControlLabel>
            {this.props.label}
          </ControlLabel>);
    }
    if (this.props.help && this.state.value) {
        help = <HelpBlock>{this.props.help}</HelpBlock>;
    }

    return (
        <FormGroup controlId={this.props.name}
                   validationState={this.getValidationState()}>
          {label}
          <FormControl componentClass={this.props.componentClass}
                       type={this.props.type}
                       value={this.props.initialValue}
                       placeholder={this.props.placeholder}
                       onChange={this.handleChange}>
            {children}
          </FormControl>
          <FormControl.Feedback className=""/>
          {help}
        </FormGroup>
    );
  }
});

TextControl.PropTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  componentClass: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  initialValue: PropTypes.string,
  handleChange: PropTypes.func,
  validation: PropTypes.func,
  help: PropTypes.string
}

export default TextControl;
