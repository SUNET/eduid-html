import React, { Component } from 'react';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';

import r from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import s from 'components/PersonalData.scss';

import { Button } from 'react-bootstrap';

import TextControl from 'components/TextControl';

const language = navigator.languages
                   ? navigator.languages[0]
                   : (navigator.language || navigator.userLanguage);

const lang_code = language.substring(0,2);

// XXX Horrible hack: we can only import from literal strings,
// not from a string in a var, neither from a string built on the spot.
// So we have to import all locales :(
import svLocale from 'react-intl/locale-data/sv';
import svMessages from '../../l10n/sv.json';
import enLocale from 'react-intl/locale-data/en';
const enMessages = {};

if (lang_code === 'sv') {
  var locale = svLocale,
      messages = svMessages;
} else {
  var locale = enLocale,
      messages = enMessages;
}
// XXX end horrible hack

addLocaleData(locale);


let PersonalData = React.createClass({

  getInitialState: function () {
    return {
      languages: []
    };
  },

  componentDidMount: function () {
    $.ajax({
      url: this.props.langs_src,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({
          languages: data
        });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.langs_src, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    let givenname_label = (<FormattedMessage id="pd.given_name"
                                               defaultMessage={`Given Name`} />),
        surname_label = (<FormattedMessage id="pd.surname"
                                               defaultMessage={`Surname`} />),
        displayname_label = (<FormattedMessage id="pd.display_name"
                                               defaultMessage={`Display Name`} />),
        language_label = (<FormattedMessage id="pd.language"
                                               defaultMessage={`Language`} />),
        button_save = (<FormattedMessage id="button_save"
                                               defaultMessage={`Save`} />),
        options = this.state.languages.map(function (lang) {
          return <option key={lang[0]} value={lang[0]}>{lang[1]}</option>;
        });

    return (
        <IntlProvider locale={ lang_code } messages={ messages }>
          <form id="personaldataview-form"
                className="form-horizontal"
                role="form">
            <fieldset id="personal-data-form" className="tabpane">
              <TextControl name="given_name"
                           label={givenname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="surname"
                           label={surname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="display_name"
                           label={displayname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="language"
                           label={language_label}
                           componentClass="select">
                {options}
              </TextControl>
              <Button bsStyle="primary">{button_save}</Button>
            </fieldset>
          </form>
        </IntlProvider>
    );
  }
});

export default PersonalData;
