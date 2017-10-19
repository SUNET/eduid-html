
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';

import 'style/PersonalData.scss';


class PersonalData extends Component {

  render () {

    let spinning = false;
    if (this.props.is_fetching) spinning = true;
    const required = value => {return value ? 'success' : 'error'},
          getVState = (name) => {return this.props.errors ? (this.props.errors[name] ? 'error' : 'success') : 'success'},
          errmsg = (name) => {return this.props.errors ? (this.props.errors[name] ? this.props.errors[name][0] : '') : ''};

    const textInput = (name) => {
        return (<TextControl name={name}
                           initialValue={this.props[name]}
                           label={this.props.l10n('pd.' + name)}
                           componentClass="input"
                           validation={required}
                           validationState={getVState(name)}
                           help={errmsg(name)}
                           type="text"
                           handleChange={this.props.handleChange} />);
    }

    return (
        <div>
          <div className="intro">
              <h4>{this.props.l10n('pd.main_title')}</h4>
                <p>{this.props.l10n('pd.long_description')}</p>
                <p>{this.props.l10n('faq_link')}
                <a href="https://www.eduid.se/faq.html">FAQ</a></p>
          </div>
          <form id="personaldataview-form"
                className="form-horizontal"
                role="form">
            <fieldset id="personal-data-form" className="tabpane">
              {textInput('given_name')}
              {textInput('surname')}
              {textInput('display_name')}
              <TextControl name="language"
                           initialValue={this.props.language}
                           label={this.props.l10n('pd.language')}
                           componentClass="select"
                           validation={required}
                           validationState={getVState('language')}
                           help={errmsg('language')}
                           value={this.props.language}
                           options={this.props.langs}
                           handleChange={this.props.handleChange} />
              <EduIDButton bsStyle="primary"
                      id="personal-data-button"
                      spinning={spinning}
                      onClick={this.props.handleSave}>
                    {this.props.l10n('button_save')}
              </EduIDButton>
            </fieldset>
          </form>
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
