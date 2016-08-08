import React, { PropTypes } from 'react';

import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


let TextControl = React.createClass({

  getValidationState: function () {
    if (this.props.validation !== undefined) {
      return this.props.validation(this.props.value);
    } else {
      return "success";
    }
  },

  render: function () {
    return (
        <FormGroup controlId={this.props.name}
                   validationState={this.getValidationState()}>
          <ControlLabel>
            {this.props.label}
          </ControlLabel>
          <FormControl componentClass={this.props.componentClass}
                       type={this.props.type}
                       value={this.props.value}
                       onChange={this.props.handleChange}>
            {this.props.children}
          </FormControl>
          <FormControl.Feedback />
          <HelpBlock>{this.props.help}</HelpBlock>
        </FormGroup>
    );
  }
});

TextControl.PropTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  validation: PropTypes.func,
  children: PropTypes.node,
}

export default TextControl;
