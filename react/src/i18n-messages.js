
// Inspired by react-intl's `injectIntl()` HOC factory function implementation:
// https://github.com/yahoo/react-intl

import React, {Component, PropTypes} from 'react';
import invariant from 'invariant';
import { intlShape, defineMessages, injectIntl, FormattedMessage } from 'react-intl';

function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
}

function invariantIntlContext({intl} = {}) {
    invariant(intl,
        '[React Intl] Could not find required `intl` object. ' +
        '<IntlProvider> needs to exist in the component ancestry.'
    );
}

export default function i18n(WrappedComponent, options = {}) {
    const {
        intlPropName = 'intl',
        l10nPropName = 'l10n',
        withRef      = false,
    } = options;

    WrappedComponent.propTypes['l10n'] = PropTypes.func;

    class InjectIntl extends Component {
        constructor(props, context) {
            super(props, context);
            invariantIntlContext(context);
        }

        getWrappedInstance() {
            invariant(withRef,
                '[React Intl] To access the wrapped instance, ' +
                'the `{withRef: true}` option must be set when calling: ' +
                '`injectIntl()`'
            );

            return this.refs.wrappedInstance;
        }

        render() {

            const l10n = (msgid, values) => {
                if (msgs[msgid] !== undefined) {
                    if (values !== undefined) {
                        return msgs[msgid](values);
                    } else {
                        return msgs[msgid];
                    }
                } else if (unformatted[msgid] !== undefined) {
                    return this.context.intl.formatMessage(unformatted[msgid], values);
                } else {
                    return 'UNKNOWN MESSAGE ID (' + msgid + ')';
                }
            };

            return (
                <WrappedComponent
                    {...this.props}
                    {...{[intlPropName]: this.context.intl}}
                    {...{[l10nPropName]: l10n}}
                    ref={withRef ? 'wrappedInstance' : null}
                />
            );
        }
    }

    InjectIntl.displayName = `InjectIntl(${getDisplayName(WrappedComponent)})`;

    InjectIntl.contextTypes = {
        intl: intlShape,
        l10n: PropTypes.func
    };

    InjectIntl.WrappedComponent = WrappedComponent;

    return InjectIntl;
}


const msgs = {
    /************************/
    /* Generic Messages *****/
    /************************/

    'Not a valid email address.': (
        <FormattedMessage
            id="Not a valid email address."
            defaultMessage={`Not a valid email address.`} />),

    'out_of_sync': (
        <FormattedMessage
            id="out_of_sync"
            defaultMessage={`User data is out of sync. Reload page to re-sync.`} />),

    "button_save": (
        <FormattedMessage
          id="button_save"
          defaultMessage={`Save`} />),

    'faq_link': (
        <FormattedMessage
            id="faq_link"
            defaultMessage={`For more information see the `} />),
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

    'cm.accept': (
        <FormattedMessage
          id="cm.accept"
          defaultMessage={`ACCEPT`} />),

    /************************/
    /* TABLE LIST ***********/
    /************************/
    'phone.phone_duplicated': (
        <FormattedMessage
            id="phone_duplicated"
            defaultMessage={`Added number is duplicated`} />),

    'phone.phone_format': (
        <FormattedMessage
            id="phone_format"
            defaultMessage={`Invalid telephone number. It must be a valid Swedish number, or written
                            using international notation, starting with '+' and followed by 10-20 digits.`} />),

    'mail_duplicated': (
        <FormattedMessage
            id="mail_duplicated"
            defaultMessage={`Added email is duplicated`} />),

    'phones.cannot_remove_unique': (
    <FormattedMessage
            id="phone_cannot_remove_unique"
            defaultMessage={`You can not delete the unique phone`} />),

    'emails.cannot_remove_unique': (
    <FormattedMessage
            id="emails_cannot_remove_unique"
            defaultMessage={`You can not delete the unique email`} />),

    'emails.cannot_remove_primary': (
    <FormattedMessage
            id="emails.cannot_remove_primary"
            defaultMessage={`You can not delete the primary email`} />),

    "tl.primary": (
        <FormattedMessage
          id="tl.primary"
          defaultMessage={`PRIMARY`} />),

    "tl.make_primary": (
        <FormattedMessage
          id="tl.make_primary"
          defaultMessage={`MAKE PRIMARY`} />),

    "tl.remove": (
        <FormattedMessage
          id="tl.remove"
          defaultMessage={`REMOVE`} />),

    "tl.pending": (
        <FormattedMessage
          id="tl.pending"
          defaultMessage={`PENDING CONFIRMATION`} />),


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

    'emails.code_invalid': (
        <FormattedMessage
          id="emails.code_invalid"
          defaultMessage={`The confirmation code is invalid, please try again or request a new code`} />),

    'emails.button_add': (
        <FormattedMessage
          id="emails.button_add"
          defaultMessage={`Add`} />),

    'emails.confirm_title': (values) => (
        <FormattedMessage
          id="emails.confirm_title"
          defaultMessage={`Check your email inbox for {email} for further instructions`}
          values={values} />),

    'emails.long_description': (
        <FormattedMessage
          id="emails.long_description"
          defaultMessage={`You can connect one or more email addresses with your eduID 
          account and select one to be your primary email address.`} />),

    'emails.main_title': (
        <FormattedMessage
          id="emails.main_title"
          defaultMessage={`Email addresses`} />),

    /************************/
    /* OIDC *****************/
    /************************/

    'oc.get_qrcode': (
        <FormattedMessage
          id="oc.get_qrcode"
          defaultMessage={`CONFIRM USING SE-LEG`} />),

    /************************/
    /* PERSONAL DATA ********/
    /************************/

    "pd.given_name": (
        <FormattedMessage
          id="pd.given_name"
          defaultMessage={`Given Name`} />),

    "pd.surname": (
        <FormattedMessage
          id="pd.surname"
          defaultMessage={`Surname`} />),

    "pd.display_name": (
        <FormattedMessage
          id="pd.display_name"
          defaultMessage={`Display Name`} />),

    "pd.language": (
        <FormattedMessage
          id="pd.language"
          defaultMessage={`Language`} />),

    'pd.long_description': (
        <FormattedMessage
          id="pd.long_description"
          defaultMessage={`This information is sent to service providers
           when you log in using eduID in order to personalize those services for you.`} />),

    'pd.main_title': (
        <FormattedMessage
          id="pd.main_title"
          defaultMessage={`Personal information`} />),

    /************************/
    /* Mobile ***************/
    /************************/

    'mobile.resend_success': (values) => (
        <FormattedMessage
            id="mobile.resend_success"
            defaultMessage={`New code successfully sent to {email}`}
            values={values} />),

    'mobile.email_label': (
        <FormattedMessage
            id="mobile.mobile"
            defaultMessage={`mobile`} />),

    'mobile.button_add': (
        <FormattedMessage
          id="mobile.button_add"
          defaultMessage={`Add`} />),

    'mobile.confirm_title': (values) => (
        <FormattedMessage
          id="mobile.confirm_title"
          defaultMessage={`Check your mobile inbox for {phone} for further instructions`}
          values={values} />),

    'phones.long_description': (
        <FormattedMessage
          id="phones.long_description"
          defaultMessage={`You can connect one or more mobile phone numbers with
           your eduID account, and select which one is the primary one.`} />),

    'phones.main_title': (
        <FormattedMessage
          id="phones.main_title"
          defaultMessage={`Mobile phone numbers`} />),

    /***********************/
    /* Nins ****************/
    /***********************/

    'nins.long_description': (
        <FormattedMessage
          id="nins.long_description"
          defaultMessage={`Some service providers (e.g. Antagning.se) require a confirmed identity.`} />),

    'nins.main_title': (
        <FormattedMessage
          id="nins.main_title"
          defaultMessage={`National identity number`} />),

    'nins.instructions': (
        <FormattedMessage
          id="nins.instructions"
          defaultMessage={`Add your Swedish national identity number and initiate the 
          confirmation process using one of the buttons below.`} />),

    'nins.mobile_suscription': (
        <FormattedMessage
          id="nins.mobile_suscription"
          defaultMessage={`Phone suscription`} />),

    'nins.letter': (
        <FormattedMessage
          id="nins.letter"
          defaultMessage={` Physical letter`} />),

    /***********************/
    /* Security ************/
    /***********************/

    'security.long_description': (
        <FormattedMessage
          id="security.long_description"
          defaultMessage={`Your eduID account password can be changed below.`} />),

    'security.main_title': (
        <FormattedMessage
          id="security.main_title"
          defaultMessage={`Security`} />),

    'security.credential': (
        <FormattedMessage
          id="security.credential"
          defaultMessage={`Credential`} />),

    'security.creation_date': (
        <FormattedMessage
          id="security.creation_date"
          defaultMessage={`Creation date`} />),

    'security.last_used': (
        <FormattedMessage
          id="security.last_used"
          defaultMessage={`Last used`} />),

    'security.change_password': (
        <FormattedMessage
          id="security.change_password"
          defaultMessage={`Change password`} />),

    'security.account_description': (
        <FormattedMessage
          id="security.account_description"
          defaultMessage={`Use the button below to permanently delete your eduID account.`} />),

    'security.account_title': (
        <FormattedMessage
          id="security.account_title"
          defaultMessage={`Account deletion`} />),

    'security.delete_account': (
        <FormattedMessage
          id="security.delete_account"
          defaultMessage={`Delete eduID account`} />),

    'security.delete_account': (
        <FormattedMessage
          id="security.delete_account"
          defaultMessage={`Delete eduID account`} />),

    'security.confirm_title': (
        <FormattedMessage
          id="security.confirm_title"
          defaultMessage={`Delete account`} />),

    'security.modal_info': (
        <FormattedMessage
          id="security.modal_info"
          defaultMessage={`Are you sure that you wish to delete your eduID account? This action will
                           permanently remove all the data associated with the account from our database. `} />),

    'security.modal_notes': (
        <FormattedMessage
          id="security.modal_notes"
          defaultMessage={`Note that for security reasons if you choose to delete your account,
                           you will be asked to log in again.`} />),

    'security.change_info': (
        <FormattedMessage
          id="security.change_info"
          defaultMessage={`For security reasons we will ask you to log in again before changing your password.`} />),

    'security.confirm_button': (
        <FormattedMessage
          id="security.confirm_button"
          defaultMessage={`Confirm deletion of eduID account`} />),

    'chpass.suggested_password': (
        <FormattedMessage
          id="chpass.suggested_password"
          defaultMessage={`Suggested password`} />),

   'chpass.custom_password': (
        <FormattedMessage
          id="chpass.custom_password"
          defaultMessage={`Custom password`} />),

   'chpass.repeat_password': (
        <FormattedMessage
          id="chpass.repeat_password"
          defaultMessage={`Repeat your custom password`} />),

   'chpass.help-text-general': (
        <FormattedMessage
          id="chpass.help-text-general"
          defaultMessage={`You can change your current password using this form. A strong password has been generated for you. You can accept the generated password by clicking "Change password" or you can opt to choose your own password using the checkbox.`} />),

   'chpass.old_password': (
        <FormattedMessage
          id="chpass.old_password"
          defaultMessage={`Current password`} />),

   'chpass.use-custom-label': (
        <FormattedMessage
          id="chpass.use-custom-label"
          defaultMessage={`Use my own password`} />),

   'chpass.title-general': (
        <FormattedMessage
          id="chpass.title-general"
          defaultMessage={`Change your password`} />),

   'chpass.change-password': (
        <FormattedMessage
          id="chpass.change-password"
          defaultMessage={`Change password`} />),
};

const unformatted = defineMessages({
    'emails.placeholder': {
        id: "emails.confirm_email_placeholder",
        defaultMessage: `Email confirmation code`,
        description: "Placeholder for email text input"
    },
    'mobile.placeholder': {
        id: "mobile.confirm_mobile_placeholder",
        defaultMessage: `Phone confirmation code`,
        description: "Placeholder for phone text input"
    },
    'chpass.help-text-newpass': {
        id: "chpass.help-text-newpass",
        defaultMessage: `<p>Choose a strong password. Some tips:</p>
            <ul>
	            <li>Use upper- and lowercase characters (preferably not in the beginning or end)</li>
	            <li>Add digits somewhere else than at the end of the password</li>
                <li>Add special characters, such as &#64; &#36; &#92; &#43; &#95; &#37;</li>
	            <li>Spaces are ignored</li>
            </ul>`,
        description: "help text for custom password"
    },
});
