import React, { Component } from 'react';
import PropTypes from 'prop-types';

import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

import i18n from 'i18n-messages';


const textInput = (props) => {
    const {
        input,
        label,
        type,
        meta,
        selectOptions,
        componentClass,
        l10n
    } = props;
    const validationState = ((meta.submitFailed || meta.touched) && meta.error) && 'error' || 'success';
    const errmsg = ((meta.submitFailed || meta.touched) && meta.error) && l10n(meta.error) || '';
    let field;

    if (componentClass === 'select') {
        let options = [];
        if (selectOptions) {
            options = selectOptions.slice();
        }
        const children = options.map(opt => {
            return (<option key={opt[0]}
                            value={opt[0]}>
                      {opt[1]}
                    </option>);
        });
        field = (
            <FormControl componentClass={componentClass}
                         {...input}>
                {children}
            </FormControl>
        );
    } else {
        field = <FormControl componentClass={componentClass}
                             {...input} /> ;
    }

    return (
        <FormGroup controlId={input.name}
                   validationState={validationState}>
          <ControlLabel>{label}</ControlLabel>
          {field}
          <FormControl.Feedback />
          <div className="form-field-error-area">
            <HelpBlock>{errmsg}</HelpBlock>
          </div>
        </FormGroup>
    );
}

export default i18n(textInput);
