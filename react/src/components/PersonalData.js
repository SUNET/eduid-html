
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';

//  XXX this interferes with the bootstrap in eduid-html
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'style/PersonalData.scss';


let PersonalData = React.createClass({

  render: function () {
    // i18n messages
    const givenname_label = (
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
              defaultMessage={`Save`} />);

    let spinning = false;
    if (this.props.is_fetching) spinning = true;

    return (
        <div>
          <form id="personaldataview-form"
                className="form-horizontal"
                role="form">
            <fieldset id="personal-data-form" className="tabpane">
              <TextControl name="given_name"
                           initialValue={this.props.given_name}
                           label={givenname_label}
                           componentClass="input"
                           type="text"
                           handleChange={this.props.handleChange} />
              <TextControl name="surname"
                           initialValue={this.props.surname}
                           label={surname_label}
                           componentClass="input"
                           type="text"
                           handleChange={this.props.handleChange} />
              <TextControl name="display_name"
                           initialValue={this.props.display_name}
                           label={displayname_label}
                           componentClass="input"
                           type="text"
                           handleChange={this.props.handleChange} />
              <TextControl name="language"
                           initialValue={this.props.language}
                           label={language_label}
                           componentClass="select"
                           options={this.props.langs}
                           handleChange={this.props.handleChange} />
              <EduIDButton bsStyle="primary"
                      spinning={spinning}
                      onClick={this.props.handleSave}>
                    {button_save}
              </EduIDButton>
            </fieldset>
          </form>
        </div>
    );
  }
});

PersonalData.propTypes = {
  given_name: PropTypes.string,
  surname: PropTypes.string,
  display_name: PropTypes.string,
  language: PropTypes.string,
  langs: PropTypes.array,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool
}

export default PersonalData;
