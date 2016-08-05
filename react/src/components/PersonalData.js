
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'react-bootstrap';
import TextControl from 'components/TextControl';

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/PersonalData.scss';

/*
let checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};
*/

let PersonalData = React.createClass({
/*
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
*/
  render: function () {
    let givenname_label = (
            <FormattedMessage
              id="pd.given_name"
              defaultMessage={`Given Name`} />),

        surname_label = (
            <FormattedMessage
              id="pd.surname"
              defaultMessage={`Surname`} />),

        displayname_label = (
            <FormattedMessage
              id="pd.display_name"
              defaultMessage={`Display Name`} />),

        language_label = (
            <FormattedMessage
              id="pd.language"
              defaultMessage={`Language`} />),

        button_save = (
            <FormattedMessage
              id="button_save"
              defaultMessage={`Save`} />),

        options = this.props.langs.map(function (lang) {
          return (<option
                    key={lang[0]}
                    value={lang[0]}>{lang[1]}
                  </option>);
        });

    return (
        <div>
          <form id="personaldataview-form"
                className="form-horizontal"
                role="form">
            <fieldset id="personal-data-form" className="tabpane">
              <TextControl name="given_name"
                           value={this.props.given_name}
                           label={givenname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="surname"
                           value={this.props.surname}
                           label={surname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="display_name"
                           value={this.props.display_name}
                           label={displayname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="language"
                           value={this.props.language}
                           label={language_label}
                           componentClass="select">
                {options}
              </TextControl>
              <Button bsStyle="primary"
                      onClick={this.props.handleSave}>
                    {button_save}
              </Button>
            </fieldset>
          </form>
        </div>
    );
  }
});

PersonalData.PropTypes = {
  given_name: PropTypes.string,
  surname: PropTypes.string,
  display_name: PropTypes.string,
  language: PropTypes.string,
  langs: PropTypes.array
}

export default PersonalData;
