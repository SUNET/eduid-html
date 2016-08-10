import React, { PropTypes } from 'react';

import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


const TextControl = React.createClass({

  getInitialState: function () {
    return { value: '' };
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.state.value === '') {
      if (nextProps.initialValue) {
        this.setState({ value: nextProps.initialValue });
      }
    }
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
    let children;
    if ((this.props.componentClass === 'select') &&
        (this.props.options)) {
      children = this.props.options.map(opt => {
        return (<option key={opt[0]}
                        value={opt[0]}>
                  {opt[1]}
                </option>);
      }, this);
    }
    return (
        <FormGroup controlId={this.props.name}
                   validationState={this.getValidationState()}>
          <ControlLabel>
            {this.props.label}
          </ControlLabel>
          <FormControl componentClass={this.props.componentClass}
                       type={this.props.type}
                       value={this.state.value}
                       onChange={this.handleChange}>
            {children}
          </FormControl>
          <FormControl.Feedback />
          <HelpBlock>{this.props.help}</HelpBlock>
        </FormGroup>
    );
  }
});

TextControl.PropTypes = {
  label: PropTypes.string.isRequired,
  componentClass: PropTypes.string.isRequired,
  type: PropTypes.string,
  initialValue: PropTypes.string,
  handleChange: PropTypes.func,
  validation: PropTypes.func,
  help: PropTypes.string
}

export default TextControl;
