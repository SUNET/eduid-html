import React, { Component } from 'react';
import { IntlProvider, addLocaleData, FormattedMessage } from 'react-intl';
import ReactDOM from 'react-dom';

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'components/PersonalData.scss';

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


let checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

let PersonalData = React.createClass({

  getInitialState: function () {
    return {
      langs: [],
      given_name: '',
      surname: '',
      display_name: '',
      language: 'sv'
    };
  },

  componentDidMount: function () {
    fetch(this.props.src, {
      // To automatically send cookies for the current domain,
      // set credentials to 'same-origin'; use 'include' for CORS
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
        "Pragma": "no-cache"
      }
    })
    .then(checkStatus)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let userdata = data.userdata.data;
      console.log(userdata);
      this.setState({
        langs: data.langs,
        given_name: userdata.given_name,
        surname: userdata.surname,
        display_name: userdata.display_name,
        language: userdata.language
      });
    }.bind(this))
    .catch(function (err) {
      console.log('Erroooooooor', err);
    });
  },

  handleSave: function (ev) {
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
        options = this.state.langs.map(function (lang) {
          return <option key={lang[0]} value={lang[0]}>{lang[1]}</option>;
        });

    return (
        <IntlProvider locale={ lang_code } messages={ messages }>
          <form id="personaldataview-form"
                className="form-horizontal"
                role="form">
            <fieldset id="personal-data-form" className="tabpane">
              <TextControl name="given_name"
                           value={this.state.given_name}
                           label={givenname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="surname"
                           value={this.state.surname}
                           label={surname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="display_name"
                           value={this.state.display_name}
                           label={displayname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="language"
                           value={this.state.language}
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


let init_personal_data_form = function (target) {
  ReactDOM.render(<PersonalData src="http://html.eduid.docker/personal-data/user" />, target);
};


export default init_personal_data_form;
