import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';


class TextInput extends Component {

    render () {
        let field;

        if (this.props.type === 'select') {
            const options = this.props.options.slice();
            const children = options.map(opt => {
                return (<option key={opt[0]}
                                value={opt[0]}>
                          {opt[1]}
                        </option>);
            }, this);
            field = (
                <Field component={FormControl}
                       {...this.props}>
                    {children}
                </Field>
            );
        } else {
            field = (
                <Field component={FormControl}
                       {...this.props} />
            );
        }

    return (
        <FormGroup controlId={this.props.name}>
          <ControlLabel>{this.props.label}</ControlLabel>
          {field}
          <FormControl.Feedback />
          <HelpBlock>{this.props.help}</HelpBlock>
        </FormGroup>
    );
  }
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  componentClass: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.object.isRequired,
  placeholder: PropTypes.string,
  help: PropTypes.string,
  options: PropTypes.array
}

TextInput.defaultProps = {
  componentClass: 'input',
  type: 'text'
}

export default TextInput;
