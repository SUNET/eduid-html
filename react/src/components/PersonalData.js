
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import TextInput from 'components/EduIDTextInput';
import EduIDButton from 'components/EduIDButton';
import { GET_USERDATA_SUCCESS } from "actions/PersonalData";

import 'style/PersonalData.scss';


/* FORM */

const validate = values => {
  const errors = {};
  ['given_name', 'surname', 'display_name', 'language'].forEach( (pdata) => {
      if (!values[pdata]) {
          errors[pdata] = 'required'
      }
  });
  return errors
}

let PdataForm = props => {
  let spinning = false;
  if (props.is_fetching) spinning = true;

  return (
    <form id="personaldataview-form"
          className="form-horizontal"
          role="form">
      <fieldset id="personal-data-form" className="tabpane">
        <Field component={TextInput}
               componentClass='input'
               type='text'
               name="given_name"
               label={props.l10n('pd.given_name')} />
        <Field component={TextInput}
               componentClass='input'
               type='text'
               name="surname"
               label={props.l10n('pd.surname')} />
        <Field component={TextInput}
               componentClass='input'
               type='text'
               name="display_name"
               label={props.l10n('pd.display_name')} />
        <Field component={TextInput}
               componentClass="select"
               type='text'
               name="language"
               selectOptions={props.langs}
               label={props.l10n('pd.language')} />
        <EduIDButton bsStyle="primary"
                id="personal-data-button"
                spinning={spinning}
                disabled={props.pristine || props.submitting || props.invalid}
                onClick={props.handleSave}
                onMouseOver={props.handleHover(props.no_lang_data_good)}>
              {props.l10n('button_save')}
        </EduIDButton>
      </fieldset>
    </form>
  )
};

PdataForm = reduxForm({
  form: 'personal_data',
  validate
})(PdataForm)

PdataForm = connect(
  state => ({
    initialValues: state.personal_data.data,
    enableReinitialize: true
  })
)(PdataForm)


/* COMPONENT */

class PersonalData extends Component {

  render () {

    return (
        <div>
          <div className="intro">
              <h4>{this.props.l10n('pd.main_title')}</h4>
                <p>{this.props.l10n('pd.long_description')}</p>
                <p>{this.props.l10n('faq_link')} <a href="https://www.eduid.se/faq.html">FAQ</a></p>
          </div>
          <PdataForm {...this.props} />
        </div>
    );
  }
}

PersonalData.propTypes = {
  data: PropTypes.object,
  langs: PropTypes.array,
  is_fetching: PropTypes.bool,
  no_lang_data_good: PropTypes.bool,
  handleSave: PropTypes.func,
  handleHover: PropTypes.func
}

export default PersonalData;
