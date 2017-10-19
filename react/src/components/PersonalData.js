
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import TextInput from 'components/EduIDTextInput';
import EduIDButton from 'components/EduIDButton';
import { reduxForm } from 'redux-form';

import 'style/PersonalData.scss';


/* FORM */

const required = value => {return value ? 'success' : 'error'},
      getVState = (props, name) => {return props.errors ? (props.errors[name] ? 'error' : 'success') : 'success'},
      errmsg = (props, name) => {return props.errors ? (props.errors[name] ? props.errors[name][0] : '') : ''};


let PdataForm = props => {
  const { handleSubmit } = props;
  let spinning = false;
  if (props.is_fetching) spinning = true;

  return (
    <form id="personaldataview-form"
          className="form-horizontal"
          onSubmit={ handleSubmit }
          role="form">
      <fieldset id="personal-data-form" className="tabpane">
        <TextInput name="given_name"
                   label={props.l10n('pd.given_name')} />
        <TextInput name="surname"
                   label={props.l10n('pd.surname')} />
        <TextInput name="display_name"
                   label={props.l10n('pd.display_name')} />
        <TextInput componentClass="select"
                   name="language"
                   options={props.langs}
                   label={props.l10n('pd.language')} />
        <EduIDButton bsStyle="primary"
                id="personal-data-button"
                spinning={spinning}
                onClick={props.handleSave}>
              {props.l10n('button_save')}
        </EduIDButton>
      </fieldset>
    </form>
  )
};

PdataForm = reduxForm({
  form: 'personal_data'
})(PdataForm)

PdataForm = connect(
  state => ({
    initialValues: state.personal_data
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
                <p>{this.props.l10n('faq_link')}
                <a href="https://www.eduid.se/faq.html">FAQ</a></p>
          </div>
          <PdataForm {...this.props} />
        </div>
    );
  }
}

PersonalData.propTypes = {
  given_name: PropTypes.string,
  surname: PropTypes.string,
  display_name: PropTypes.string,
  language: PropTypes.string,
  langs: PropTypes.array,
  errors: PropTypes.object,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool
}

export default i18n(PersonalData);
