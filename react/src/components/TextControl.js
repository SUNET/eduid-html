import React, { Component } from 'react';

import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';


let TextControl = React.createClass({

  getInitialState: function () {
    return {
      value: ""
    };
  },

  getValidationState: function () {
    if (this.props.validation !== undefined) {
      return this.props.validation(this.state.value);
    } else {
      return "success";
    }
  },

  render: function () {
    return (
        <FormGroup controlId="item-{this.props.name}"
                   validationState={this.getValidationState()}>
          <ControlLabel>
            {this.props.label}
          </ControlLabel>
          <FormControl componentClass={this.props.componentClass}
                       type={this.props.type}
                       value={this.state.value}
                       onChange={this.props.handleChange}>
            {this.props.children}
          </FormControl>
          <FormControl.Feedback />
          <HelpBlock>{this.props.help}</HelpBlock>
        </FormGroup>
    );
  }
});


export default TextControl;
