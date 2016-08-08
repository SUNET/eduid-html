
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button } from 'react-bootstrap';
import TextControl from 'components/TextControl';

// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/PersonalData.scss';


let PersonalData = React.createClass({

  render: function () {
    const { store } = this.context;
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

        options = store.getState().config.get("available_languages").toArray().map(function (lang) {
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
                           defaultValue={this.props.given_name}
                           label={givenname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="surname"
                           defaultValue={this.props.surname}
                           label={surname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="display_name"
                           defaultValue={this.props.display_name}
                           label={displayname_label}
                           componentClass="input"
                           type="text" />
              <TextControl name="language"
                           defaultValue={this.props.language}
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

PersonalData.contextTypes = {
  store: PropTypes.object
}

export default PersonalData;
