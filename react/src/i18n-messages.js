
import React, { PropTypes } from 'react';
import { intlShape, defineMessages, injectIntl, FormattedMessage } from 'react-intl';


const I18n = React.createClass({

    propTypes: {
        intl: intlShape.isRequired,
        msgid: PropTypes.string
        values: PropTypes.object
    },

    render: (msgid, values) => {
        if (msgs[msgid] !== undefined) {
            if (values !== undefined) {
                return msgs[msgid](values);
            } else {
                return msgs[msgid];
            }
        } else if (unformatted[msgid] !== undefined) {
            return this.props.intl.formatMessage(unformated[msgid], values);
        } else {
            return 'UNKNOWN MESSAGE ID'
        }
    }
});

export default injectIntl(I18n);

const msgs = {
    /************************/
    /* Generic Messages *****/
    /************************/

    'out_of_sync': (
        <FormattedMessage
            id="out_of_sync"
            defaultMessage={`User data is out of sync. Reload page to re-sync.`} />),

    /************************/
    /* ConfirmModal *********/
    /************************/

    'cm.lost_code': (
        <FormattedMessage
            id="cm.lost_code"
            defaultMessage={`Lost your confirmation code?`} />),

    'cm.resend_code': (
        <FormattedMessage
            id="cm.resend_code"
            defaultMessage={`Resend confirmation code`} />),

    'cm.ok': (
        <FormattedMessage
            id="cm.ok"
            defaultMessage={`OK`} />),

    'cm.finish': (
        <FormattedMessage
            id="cm.finish"
            defaultMessage={`FINISH`} />),

    'cm.cancel': (
        <FormattedMessage
            id="cm.cancel"
            defaultMessage={`CANCEL`} />),

    /************************/
    /* Emails ***************/
    /************************/

    'emails.resend_success': (values) => (
        <FormattedMessage
            id="emails.resend_success"
            defaultMessage={`New code successfully sent to {email}`}
            values={values} />),

    'emails.email_label': (
        <FormattedMessage
            id="emails.email"
            defaultMessage={`Email`} />),

    'emails.button_add': (
        <FormattedMessage
          id="emails.button_add"
          defaultMessage={`Add`} />),

    'emails.confirm_title': (values) => (
        <FormattedMessage
          id="emails.confirm_email_title"
          defaultMessage={`Check your email inbox for {email} for further instructions`}
          values={values} />),

};

const unformatted = defineMessages({
    'emails.placeholder': {
        id: "emails.confirm_email_placeholder",
        defaultMessage: `Email confirmation code`,
        description: "Placeholder for email text input"
    },
});
