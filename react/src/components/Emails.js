
import React, { PropTypes } from 'react';
import { intlShape, defineMessages, injectIntl, FormattedMessage } from 'react-intl';

import EduIDButton from 'components/EduIDButton';
import TextControl from 'components/TextControl';
import TableList from 'components/TableList';
import ConfirmModal from 'components/ConfirmModal';

import 'style/Emails.scss';


let Emails = React.createClass({

  render: function () {
    // i18n messages
    const email_label = (
            <FormattedMessage
              id="emails.email"
              defaultMessage={`Email`} />),

          button_add = (
            <FormattedMessage
              id="emails.button_add"
              defaultMessage={`Add`} />),

          confirmTitle = (
            <FormattedMessage
              id="emails.confirm_email_title"
              defaultMessage={`Check your email inbox for {email} for further instructions`}
              values={{email: this.props.confirming}}/>),

          msgs = defineMessages({
              placeholder: {
                  id: "emails.confirm_email_placeholder",
                  defaultMessage: "Email confirmation code",
                  description: "Placeholder for email text input"
              }
          }),
          placeholder = this.props.intl.formatMessage(msgs.placeholder);

    let modalClasses = 'modal fade';
    if (this.props.confirming) modalClasses = 'modal show';

    return (
        <div className="emailsview-form-container ">
            <TableList entries={this.props.emails}
                       handleStartConfirmation={this.props.handleStartConfirmation} />
            <div className="form-content">
              <form id="emailsview-form"
                    className="form-horizontal"
                    role="form">
                <fieldset id="emails-form" className="tabpane">
                  <TextControl name="email"
                               label={email_label}
                               componentClass="input"
                               type="text"
                               handleChange={this.props.handleChange} />
                  <EduIDButton bsStyle="primary"
                          onClick={this.props.handleAdd}>
                        {button_add}
                  </EduIDButton>
                </fieldset>
              </form>
            </div>
            <ConfirmModal
                title={confirmTitle}
                placeholder={placeholder}
                modalClasses={modalClasses} />
        </div>
    );
  }
});

Emails.propTypes = {
  intl: intlShape.isRequired,
  emails: PropTypes.array,
  errorMsg: PropTypes.string,
  confirming: PropTypes.string,
  handleChange: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func
}

export default injectIntl(Emails);
