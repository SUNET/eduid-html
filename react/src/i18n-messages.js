
// Inspired by react-intl's `injectIntl()` HOC factory function implementation:
// https://github.com/yahoo/react-intl

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import invariant from 'invariant';
import { intlShape, defineMessages, FormattedMessage, FormattedHTMLMessage } from 'react-intl';

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

    //WrappedComponent.propTypes['l10n'] = PropTypes.func;

    class InjectIntl extends Component {
        constructor(props, context) {
            super(props, context);
            invariantIntlContext(context);
        }

        getWrappedInstance() {
            invariant(withRef,
                '[React Intl] To access the wrapped instance, ' +
                'the `{withRef: true}` option must be set when calling: ' +
                '`i18n()`'
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

    'error_in_form': (
        <FormattedMessage
            id="error_in_form"
            defaultMessage={`Check the form below for errors.`} />),

    'required': (
        <FormattedMessage
            id="required"
            defaultMessage={`Required`} />),

    'Error: NOT FOUND': (
        <FormattedMessage
            id="Error: NOT FOUND"
            defaultMessage={`There was an error (404) servicing your request. The administrator has been alerted. Please try again later.`} />),

    'Error: Internal Server Error': (
        <FormattedMessage
            id="Error: Internal Server Error"
            defaultMessage={`There was an error (500) servicing your request. The administrator has been alerted. Please try again later.`} />),

    'Error: Service Unavailable': (
        <FormattedMessage
            id="Error: Service Unavailable"
            defaultMessage={`Service Unavailable. Check your internet connection.`} />),

    'Not a valid email address.': (
        <FormattedMessage
            id="Not a valid email address."
            defaultMessage={`Not a valid email address.`} />),

    'user-out-of-sync': (
        <FormattedMessage
            id="user-out-of-sync"
            defaultMessage={`User data is out of sync. Reload page to re-sync.`} />),

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

    'Missing error message': (
        <FormattedMessage
            id="Missing error message"
            defaultMessage={`Missing error message`} />),

    'nin needs to be formatted as 18|19|20yymmddxxxx': (
        <FormattedMessage
            id="nin needs to be formatted as 18|19|20yymmddxxxx"
            defaultMessage={`National identity number needs to be in the form of yyyymmddxxxx`} />),

    'Temporary technical problems': (
        <FormattedMessage
            id="Temporary technical problems"
            defaultMessage={`Temporary technical problems, please try again later`} />),

    'No connection to authorization endpoint': (
        <FormattedMessage
            id="No connection to authorization endpoint"
            defaultMessage={`No connection to authorization endpoint, please try again later`} />),

    'CSRF failed to validate': (
        <FormattedMessage
            id="CSRF failed to validate"
            defaultMessage={`CSRF failed to validate, please reload the page`} />),

   'error_navet_task': (
        <FormattedMessage
          id="error_navet_task"
          defaultMessage={`Communication problem with Navet`} />),

   'error_lookup_mobile_task': (
        <FormattedMessage
          id="error_lookup_mobile_task"
          defaultMessage={`Problem looking up the phone number`} />),

   'unexpected-problem': (
        <FormattedMessage
          id="unexpected-problem"
          defaultMessage={`There was an unexpected problem servicing your request, please try again or contact the site administrators`} />),

   'unexpected-success': (
        <FormattedMessage
          id="unexpected-success"
          defaultMessage={`The request was successfully addressed`} />),

    /************************/
    /* Main *****************/
    /************************/


    'main.profile_title': (
        <FormattedMessage
            id="main.profile_title"
            defaultMessage={`Profile`} />),

    'main.personal_data': (
        <FormattedMessage
            id="main.personal_data"
            defaultMessage={`Personal Information`} />),

    'main.nins': (
        <FormattedMessage
            id="main.nins"
            defaultMessage={`Confirm Identity`} />),

    'main.emails': (
        <FormattedMessage
            id="main.emails"
            defaultMessage={`Email Addresses`} />),

    'main.phones': (
        <FormattedMessage
            id="main.phones"
            defaultMessage={`Phone Numbers`} />),

    'main.account_linking': (
        <FormattedMessage
            id="main.account_linking"
            defaultMessage={`Account Linking`} />),

    'main.security': (
        <FormattedMessage
            id="main.security"
            defaultMessage={`Security`} />),

    'main.personal_data_label_sm': (
        <FormattedMessage
            id="main.personal_data_label_sm"
            defaultMessage={`Personal`} />),

    'main.nins_label_sm': (
        <FormattedMessage
            id="main.nins_label_sm"
            defaultMessage={`Identity`} />),

    'main.emails_label_sm': (
        <FormattedMessage
            id="main.emails_label_sm"
            defaultMessage={`Emails`} />),

    'main.phones_label_sm': (
        <FormattedMessage
            id="main.phones_label_sm"
            defaultMessage={`Phones`} />),

    'main.account_linking_label_sm': (
        <FormattedMessage
            id="main.account_linking_label_sm"
            defaultMessage={`Account Linking`} />),

    'main.security_label_sm': (
        <FormattedMessage
            id="main.security_label_sm"
            defaultMessage={`Security`} />),

    'main.eduid_id': (
        <FormattedMessage
            id="main.eduid_id"
            defaultMessage={`eduID identifier`} />),

    'main.copyright': (
        <FormattedMessage
            id="main.copyright"
            defaultMessage={` SUNET 2013-2018`} />),

    'main.menu': (
        <FormattedMessage
            id="main.menu"
            defaultMessage={`Menu`} />),

    /************************/
    /* ConfirmModal *********/
    /************************/

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

    'cm.close': (
        <FormattedMessage
          id="cm.close"
          defaultMessage={`CLOSE`} />),

    'cm.enter_code': (
        <FormattedMessage
          id="cm.enter_code"
          defaultMessage={`Enter your confirmation code below`} />),

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

    'emails.cannot_remove_primary': (
    <FormattedMessage
            id="emails.cannot_remove_primary"
            defaultMessage={`You can not delete the primary email`} />),

    'emails.invalid_email': (
    <FormattedMessage
            id="emails.invalid_email"
            defaultMessage={`The entered value does not look like an email`} />),

    'emails.missing': (
    <FormattedMessage
            id="emails.missing"
            defaultMessage={`You must provide an email address`} />),

    'emails.unknown_email': (
    <FormattedMessage
            id="emails.unknown_email"
            defaultMessage={`We have no record of the email address you provided`} />),

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

    'emails.input_help_text': (
        <FormattedMessage
          id="emails.input_help_text"
          defaultMessage={"A valid email address"} />),

    'emails.code_invalid': (
        <FormattedMessage
          id="emails.code_invalid"
          defaultMessage={`The confirmation code is invalid, please try again or request a new code`} />),

    'emails.code_invalid_or_expired': (
        <FormattedMessage
          id="emails.code_invalid_or_expired"
          defaultMessage={`The confirmation code is invalid or it has expired, please try again or request a new code`} />),

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

    'emails.get-success': (
        <FormattedMessage
          id="emails.get-success"
          defaultMessage={`Successfully retrieved Email addresses`} />),

    'emails.duplicated': (
        <FormattedMessage
          id="emails.duplicated"
          defaultMessage={`That email address is already in use, please choose another`} />),

    'emails.save-success': (
        <FormattedMessage
          id="emails.save-success"
          defaultMessage={`Email address saved successfully`} />),

    'emails.unconfirmed_address_not_primary': (
        <FormattedMessage
          id="emails.unconfirmed_address_not_primary"
          defaultMessage={`An unconfirmed mail address cannot be set as primary`} />),

    'emails.primary-success': (
        <FormattedMessage
          id="emails.primary-success"
          defaultMessage={`Email address successfully set as primary`} />),

    'emails.code_expired_send_new': (
        <FormattedMessage
          id="emails.code_expired_send_new"
          defaultMessage={`Expired verification code, sending another`} />),

    'emails.verification-success': (
        <FormattedMessage
          id="emails.verification-success"
          defaultMessage={`Successfully verified email address`} />),

    'emails.cannot_remove_unique': (
        <FormattedMessage
          id="emails.cannot_remove_unique"
          defaultMessage={`You must have at least one email address`} />),

    'emails.cannot_remove_unique_verified': (
        <FormattedMessage
          id="emails.cannot_remove_unique_verified"
          defaultMessage={`You must have at least one verified email address`} />),

    'emails.removal-success': (
        <FormattedMessage
          id="emails.removal-success"
          defaultMessage={`Successfully removed email address`} />),

    'emails.code-sent': (
        <FormattedMessage
          id="emails.code-sent"
          defaultMessage={`Successfully sent verification code`} />),

    /************************/
    /* Phone Subscription ***/
    /************************/

    'lmp.confirm-lookup-mobile': (
        <FormattedMessage
          id="lmp.confirm-lookup-mobile"
          defaultMessage={`Phone Subscription`} />),

    'lmp.initialize_proofing_help_text': (
        <FormattedMessage
          id="lmp.initialize_proofing_help_text"
          defaultMessage={`To use this option you need to have your phone number subscription under your own name.`} />),

    'no_phone': (
        <FormattedMessage
          id="no_phone"
          defaultMessage={`You must add a phone number to be able to use this vetting method`} />),

    'lmp.verification_success': (
        <FormattedMessage
          id="lmp.verification_success"
          defaultMessage={`Your NIN has been successfully verified`} />),

    /************************/
    /* OIDC SELEG ***********/
    /************************/

    'oc.initialize_proofing': (
        <FormattedMessage
          id="oc.initialize_proofing"
          defaultMessage={`SE-LEG`} />),

    'oc.initialize_proofing_help_text': (
        <FormattedHTMLMessage
          id="oc.initialize_proofing_help_text"
          defaultMessage={`To use this option you need to visit a <a href="https://www.sunet.se/samarbeten/projekt-nationell-tjanst-for-grundidentifiering/" target="_blank">SE-LEG RA</a> and show identification.`} />),

    'oc.modal_title': (
        <FormattedMessage
          id="oc.modal_title"
          defaultMessage={`Confirm using SE-LEG`} />),

    'oc.instructions_title': (
        <FormattedMessage
          id="oc.instructions_title"
          defaultMessage={`How to confirm your account using SE-LEG`} />),

    'oc.instructions_step_1': (
        <FormattedHTMLMessage
          id="oc.instructions_step_1"
          defaultMessage={`Visit the nearest library on this list: <ul><li>Mjölby: Burensköldsvägen 13</li><li>Motala: Repslagaregatan 1</li><li>Åtvidaberg: B-fabriksgränd 4</li></ul>`} />),

    'oc.instructions_step_2': (
        <FormattedMessage
          id="oc.instructions_step_2"
          defaultMessage={`Bring your chosen form of ID and the QR code below and ask the librarian for a verification of your eduID account.`} />),

    'oc.instructions_step_3': (
        <FormattedMessage
          id="oc.instructions_step_3"
          defaultMessage={`Within a couple of hours you account should be verified.`} />),

    'oc.error_missing_nin': (
        <FormattedMessage
          id="oc.error_missing_nin"
          defaultMessage={`Please add a national identity number and try again`} />),

    'oc.error_unknown_error': (
        <FormattedMessage
          id="oc.error_unknown_error"
          defaultMessage={`Temporary technical difficulties, please try again later`} />),


    /************************/
    /* OIDC FREJA ***********/
    /************************/

    'ocf.initialize_proofing': (
        <FormattedMessage
          id="ocf.initialize_proofing"
          defaultMessage={`FREJA EID`} />),

    'ocf.initialize_proofing_help_text': (
        <FormattedHTMLMessage
          id="ocf.initialize_proofing_help_text"
          defaultMessage={`To use this option you need to have the <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">Freja eID app</a> installed on your device.`} />),

    'ocf.modal_title': (
        <FormattedMessage
          id="ocf.modal_title"
          defaultMessage={`Confirm using Freja eID`} />),

    'ocf.freja_instructions_title': (
        <FormattedMessage
          id="ocf.freja_instructions_title"
          defaultMessage={`How to confirm your account using Freja eID`} />),

    'ocf.freja_instructions_step_1': (
        <FormattedMessage
          id="ocf.freja_instructions_step_1"
          defaultMessage={`Install the Freja eID app on your mobile device.`} />),

    'ocf.freja_instructions_step_2': (
        <FormattedMessage
          id="ocf.freja_instructions_step_2"
          defaultMessage={`Open the app and follow the instructions to reach Freja eID+ (Plus) status.`} />),

    'ocf.freja_instructions_step_3': (
        <FormattedMessage
          id="ocf.freja_instructions_step_3"
          defaultMessage={`Bring your chosen form of ID to an authorized agent and ask them to scan the QR-code in the Freja eID app. There is a map function in the Freja eID app to help you locate your nearest agent.`} />),

    'ocf.freja_instructions_step_4': (
        <FormattedMessage
          id="ocf.freja_instructions_step_4"
          defaultMessage={`Return here using your mobile phone and click the link at the bottom of the page. The app will open.`} />),

    'ocf.freja_instructions_step_5': (
        <FormattedMessage
          id="ocf.freja_instructions_step_5"
          defaultMessage={`Approve that Freja eID sends your personal identity number to eduID. Done!`} />),

    'ocf.freja_instructions_install_link': (
        <FormattedMessage
          id="ocf.freja_instructions_install_link"
          defaultMessage={`I need to install Freja eID`} />),

    'ocf.open_app': (
        <FormattedMessage
          id="ocf.open_app"
          defaultMessage={`I have Freja eID installed`} />),

    'ocf.not_on_mobile_title': (
        <FormattedMessage
          id="ocf.not_on_mobile_title"
          defaultMessage={`Not using your phone?`} />),

    'ocf.not_on_mobile_message': (
        <FormattedHTMLMessage
          id="ocf.not_on_mobile_message"
          defaultMessage={`You need to switch to a mobile device (iOS or Android) with <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">Freja eID</a> installed before you will be able to confirm your account using Freja eID.`} />),

    'ocf.error_missing_nin': (
        <FormattedMessage
          id="ocf.error_missing_nin"
          defaultMessage={`Please add a national identity number and try again`} />),

    'ocf.error_unknown_error': (
        <FormattedMessage
          id="ocf.error_unknown_error"
          defaultMessage={`Temporary technical difficulties, please try again later`} />),

    /************************/
    /* EIDAS ****************/
    /************************/

    'eidas.freja_eid': (
        <FormattedMessage
          id="eidas.freja_eid"
          defaultMessage={`FREJA EID`} />),

    'eidas.initialize_proofing_help_text': (
        <FormattedHTMLMessage
          id="eidas.initialize_proofing_help_text"
          defaultMessage={`To use this option you need to have <a href="https://frejaeid.com/skaffa-freja-eid/" target="_blank">Freja eID+</a>.`} />),

    'eidas.modal_title': (
        <FormattedMessage
          id="eidas.modal_title"
          defaultMessage={`Confirm using Freja eID+`} />),

    'eidas.freja_instructions_title': (
        <FormattedMessage
          id="eidas.freja_instructions_title"
          defaultMessage={`How to confirm your account using Freja eID+`} />),

    'eidas.freja_instructions_step_1': (
        <FormattedMessage
          id="eidas.freja_instructions_step_1"
          defaultMessage={`Install the Freja eID app on your mobile device.`} />),

    'eidas.freja_instructions_step_2': (
        <FormattedMessage
          id="eidas.freja_instructions_step_2"
          defaultMessage={`Follow the instructions in the app to reach Freja eID+ status.`} />),

    'eidas.freja_instructions_step_3': (
        <FormattedMessage
          id="eidas.freja_instructions_step_3"
          defaultMessage={`Click the link "I have Freja eID installed" and follow the instructions on the Freja eID login page that opens.`} />),

    'eidas.freja_instructions_step_4': (
        <FormattedMessage
          id="eidas.freja_instructions_step_4"
          defaultMessage={`You will be returned to the eduID dashboard after you complete the Freja eID+ login.`} />),

    'eidas.freja_instructions_install_link': (
        <FormattedMessage
          id="eidas.freja_instructions_install_link"
          defaultMessage={`I need to install Freja eID`} />),

    'eidas.freja_eid_ready': (
        <FormattedMessage
          id="eidas.freja_eid_ready"
          defaultMessage={`I have Freja eID installed`} />),

    'eidas.error_missing_nin': (
        <FormattedMessage
          id="eidas.error_missing_nin"
          defaultMessage={`Please add a national identity number and try again`} />),

    'eidas.error_unknown_error': (
        <FormattedMessage
          id="eidas.error_unknown_error"
          defaultMessage={`Temporary technical difficulties, please try again later`} />),

    /************************/
    /* ACCOUNT LINKING ******/
    /************************/

    'account_linking.main_title': (
        <FormattedMessage
          id="account_linking.main_title"
          defaultMessage={`Account Linking`} />),

    'account_linking.long_description': (
        <FormattedMessage
          id="account_linking.long_description"
          defaultMessage={`You can link other accounts with you eduID account.`} />),

    /************************/
    /* ORCID ****************/
    /************************/

    'orc.authorization_success': (
          <FormattedMessage
            id="orc.authorization_success"
            defaultMessage={`ORCID connected successfully`} />),

    'orc.already_connected': (
          <FormattedMessage
            id="orc.already_connected"
            defaultMessage={`ORCID already connected to this account`} />),

    'orc.unknown_state': (
          <FormattedMessage
            id="orc.unknown_state"
            defaultMessage={`State was unknown when trying to connect ORCID account`} />),

    'orc.sub_mismatch': (
          <FormattedMessage
            id="orc.sub_missmatch"
            defaultMessage={`Subject mismatch when trying to connect ORCID account`} />),

    'orc.title': (
          <FormattedMessage
            id="orc.title"
            defaultMessage={`ORCID`} />),

    'orc.long_description': (
          <FormattedMessage
            id="orc.long_description"
            defaultMessage={`ORCID provides a persistent identifier – an ORCID iD – that distinguishes you from other researchers and a mechanism for linking your research outputs and activities to your ORCID iD regardless of which organization you are working with.`} />),

    'orc.about_link': (
          <FormattedHTMLMessage
            id="orc.about_link"
            defaultMessage={`Learn more about ORCID in eduID from our <a href="https://www.eduid.se/en/faq.html">FAQ</a>.`} />),

    'orc.connect': (
          <FormattedMessage
            id="orc.connect"
            defaultMessage={`Connect ORCID account`} />),

    'orc.authorization_fail': (
          <FormattedMessage
            id="orc.authorization_fail"
            defaultMessage={`ORCID authentication failed`} />),

    /************************/
    /* EIDAS ****************/
    /************************/

    'eidas.token_not_found': (
          <FormattedMessage
            id="eidas.token_not_found"
            defaultMessage={`Security Key not found`} />),

    'eidas.token_not_in_credentials_used': (
          <FormattedMessage
            id="eidas.token_not_in_credentials_used"
            defaultMessage={`Security Key not used for login`} />),

    'eidas.nin_not_matching': (
          <FormattedMessage
            id="eidas.nin_not_matching"
            defaultMessage={`Asserted identity not matching the current accounts verified identity`} />),

    'eidas.nin_already_verified': (
          <FormattedMessage
            id="eidas.nin_already_verified"
            defaultMessage={`You have already verified your identity`} />),

    'eidas.nin_verify_success': (
          <FormattedMessage
            id="eidas.nin_verify_success"
            defaultMessage={`Identity verified successfully`} />),

    'eidas.token_verify_success': (
          <FormattedMessage
            id="eidas.token_verify_success"
            defaultMessage={`Security Key verified successfully`} />),

    'eidas.authn_context_mismatch': (
          <FormattedMessage
            id="eidas.authn_context_mismatch"
            defaultMessage={`Wrong authentication context received`} />),

    'eidas.reauthn_expired': (
      <FormattedMessage
        id="eidas.reauthn_expired"
        defaultMessage={`Authentication has expired. Please try again.`} />),

    /************************/
    /* PERSONAL DATA ********/
    /************************/

    'pd.long_description': (
        <FormattedMessage
          id="pd.long_description"
          defaultMessage={`This information is sent to service providers
           when you log in using eduID in order to personalize those services for you.`} />),

    'pd.main_title': (
        <FormattedMessage
          id="pd.main_title"
          defaultMessage={`Personal information`} />),

    'pd.all-data-success': (
        <FormattedMessage
          id="pd.all-data-success"
          defaultMessage={`Successfully retrieved personal information`} />),

    'pd.pdata-success': (
        <FormattedMessage
          id="pd.pdata-success"
          defaultMessage={`Successfully retrieved personal information`} />),

    'pd.save-success': (
        <FormattedMessage
          id="pd.save-success"
          defaultMessage={`Successfully saved personal information`} />),

    'pdata.field_required': (
        <FormattedMessage
          id="pdata.field_required"
          defaultMessage={`This field is required`} />),

    'pd.display_name_input_help_text': (
        <FormattedMessage
          id="pd.display_name_input_help_text"
          defaultMessage={`Some services will show this instead of your given name and surname.`} />),


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

    'phones.input_help_text': (
        <FormattedMessage
          id="phones.input_help_text"
          defaultMessage={"Phone number starting with 0 or +"} />),

    'phones.main_title': (
        <FormattedMessage
          id="phones.main_title"
          defaultMessage={`Mobile phone numbers`} />),

    'phones.get-success': (
        <FormattedMessage
          id="phones.get-success"
          defaultMessage={`Successfully retrieved phone numbers`} />),

    'phones.duplicated': (
        <FormattedMessage
          id="phones.duplicated"
          defaultMessage={`That phone number is already in use, please choose another`} />),

    'phones.save-success': (
        <FormattedMessage
          id="phones.save-success"
          defaultMessage={`phone number saved successfully`} />),

    'phones.unconfirmed_number_not_primary': (
        <FormattedMessage
          id="phones.unconfirmed_number_not_primary"
          defaultMessage={`An unconfirmed phone number cannot be set as primary`} />),

    'phones.primary-success': (
        <FormattedMessage
          id="phones.primary-success"
          defaultMessage={`phone number successfully set as primary`} />),

    'phones.code_expired_send_new': (
        <FormattedMessage
          id="phones.code_expired_send_new"
          defaultMessage={`Expired verification code, sending another`} />),

    'phones.code_invalid': (
        <FormattedMessage
          id="phones.code_invalid"
          defaultMessage={`Invalid verification code`} />),

    'phones.invalid_phone': (
        <FormattedMessage
          id="phones.invalid_phone"
          defaultMessage={`Invalid phone number`} />),

    'phones.unknown_phone': (
        <FormattedMessage
          id="phones.unknown_phone"
          defaultMessage={`We have no record of the phone number you provided`} />),

    'phones.code_invalid_or_expired': (
        <FormattedMessage
          id="phones.code_invalid_or_expired"
          defaultMessage={`The confirmation code is invalid or it has expired, please try again or request a new code`} />),

    'phones.verification-success': (
        <FormattedMessage
          id="phones.verification-success"
          defaultMessage={`Successfully verified phone number`} />),

    'phones.cannot_remove_unique': (
        <FormattedMessage
          id="phones.cannot_remove_unique"
          defaultMessage={`You must have at least one phone number`} />),

    'phones.cannot_remove_primary': (
        <FormattedMessage
          id="phones.cannot_remove_primary"
          defaultMessage={`You cannot remove your primary phone number`} />),

    'phones.removal-success': (
        <FormattedMessage
          id="phones.removal-success"
          defaultMessage={`Successfully removed phone number`} />),

    'phones.code-sent': (
        <FormattedMessage
          id="phones.code-sent"
          defaultMessage={`Successfully sent verification code`} />),

    'phone.e164_format': (
        <FormattedMessage
          id="phone.e164_format"
          defaultMessage={`Invalid telephone number. It must be a valid Swedish number, or written
                            using international notation, starting with '+' and followed by 10-20 digits.`} />),

    'phone.swedish_mobile_format': (
        <FormattedMessage
          id="phone.swedish_mobile_format"
          defaultMessage={`Invalid telephone number. It must be a valid Swedish number, or written
                            using international notation, starting with '+' and followed by 10-20 digits.`} />),

    /***********************/
    /* Security ************/
    /***********************/

    // FF and Chrome webauthn error message
    'InvalidStateError: The user attempted to register an authenticator that contains one of the credentials already registered with the relying party.': (
        <FormattedMessage
          id="InvalidStateError: The user attempted to register an authenticator that contains one of the credentials already registered with the relying party."
          defaultMessage={`You are attempting to register an authenticator that contains one of the credentials already registered with the relying party`} />),

     // FF and Chrome webauthn error message
    'NotAllowedError: The operation either timed out or was not allowed. See: https://w3c.github.io/webauthn/#sec-assertion-privacy.': (
        <FormattedMessage
          id="NotAllowedError: The operation either timed out or was not allowed. See: https://w3c.github.io/webauthn/#sec-assertion-privacy."
          defaultMessage={`Security Key registration either timed out or was cancelled. Please try again.`} />),

     // Edge webauthn error message
    'NotAllowedError': (
        <FormattedMessage
          id="NotAllowedError"
          defaultMessage={`Security Key registration timed out or was cancelled. Please try again.`} />),

    'cred.credential_type': (
        <FormattedMessage
          id="cred.credential_type"
          defaultMessage={`Credential type.`} />),

    'security.long_description': (
        <FormattedMessage
          id="security.long_description"
          defaultMessage={`Your eduID account password can be changed below.`} />),

    'security.description': (
        <FormattedMessage
          id="security.description"
          defaultMessage={`Description`} />),

    'security.remove': (
        <FormattedMessage
          id="security.remove"
          defaultMessage={`Remove`} />),

    'security.status': (
        <FormattedMessage
          id="security.status"
          defaultMessage={`Status`} />),

    'security.confirm_with_eid': (
        <FormattedMessage
          id="security.confirm_with_eid"
          defaultMessage={`Confirm with Freja eID`} />),

    'security.confirmed': (
        <FormattedMessage
          id="security.confirmed"
          defaultMessage={`Confirmed`} />),

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

    'security.password_credential_type': (
        <FormattedMessage
          id="security.password_credential_type"
          defaultMessage={`Password`} />),

    'security.confirm_title_chpass': (
        <FormattedMessage
          id="security.confirm_title_chpass"
          defaultMessage={`Secure password change`} />),

    'security.confirm_title_deletion': (
        <FormattedMessage
          id="security.confirm_title_deletion"
          defaultMessage={`Account deletion`} />),

    'security.u2f.max_allowed_tokens': (
        <FormattedMessage
          id="security.u2f.max_allowed_tokens"
          defaultMessage={`You already have the maximum allowed number of tokens`} />),

    'security.u2f.missing_enrollment_data': (
        <FormattedMessage
          id="security.u2f.missing_enrollment_data"
          defaultMessage={`Found no U2F enrollment data in your session`} />),

    'security.u2f.no_token_found': (
        <FormattedMessage
          id="security.u2f.no_token_found"
          defaultMessage={`No U2F token found in your session`} />),

    'security.u2f.missing_token': (
        <FormattedMessage
          id="security.u2f.missing_token"
          defaultMessage={`No U2F token found in your session`} />),

    'security.u2f.missing_challenge_data': (
        <FormattedMessage
          id="security.u2f.missing_challenge_data"
          defaultMessage={`Found no U2F challenge data in your session`} />),

    'security.u2f.description_to_long': (
        <FormattedMessage
          id="security.u2f.description_to_long"
          defaultMessage={`You tried to set a too long Security Key description`} />),

    'security.add_u2f_token': (
        <FormattedMessage
          id="security.add_u2f_token"
          defaultMessage={`Add Security Key`} />),

    'security.u2f_registration_error_unknown': (
        <FormattedMessage
          id="security.u2f_registration_error_unknown"
          defaultMessage={`U2F error: Unknown error`} />),

    'security.u2f_registration_error_bad': (
        <FormattedMessage
          id="security.u2f_registration_error_bad"
          defaultMessage={`U2F error: Bad request`} />),

    'security.u2f_registration_error_unsupported': (
        <FormattedMessage
          id="security.u2f_registration_error_unsupported"
          defaultMessage={`U2F error: Configuration unsupported`} />),

    'security.u2f_registration_error_device': (
        <FormattedMessage
          id="security.u2f_registration_error_device"
          defaultMessage={`U2F error: Device ineligible`} />),

    'security.u2f_registration_error_timeout': (
        <FormattedMessage
          id="security.u2f_registration_error_timeout"
          defaultMessage={`U2F error: Timeout`} />),

    'security.u2f_registration_error_code': (values) => (
        <FormattedMessage
            id="security.u2f_registration_error_code"
            defaultMessage={`U2F failed with error code: {errorCode}`}
            values={values} />),

    'security.u2f_credential_type': (
        <FormattedMessage
          id="security.u2f_credential_type"
          defaultMessage={`Security Key`} />),

    'security.u2f_register_success': (
        <FormattedMessage
          id="security.u2f_register_success"
          defaultMessage={`Security Key successfully registered`} />),

    'u2f.action-required': (
        <FormattedMessage
          id="u2f.action-required"
          defaultMessage={`Action required for multi factor authentication`} />),

    'u2f.push-the-button': (
        <FormattedMessage
          id="u2f.push-the-button"
          defaultMessage={`Please touch the button on your Security Key`} />),

    'security.u2f-token-removed': (
        <FormattedMessage
          id="security.u2f-token-removed"
          defaultMessage={`Security Key successfully removed`} />),

    'security.u2f-describe-title': (
        <FormattedMessage
          id="security.u2f-describe-title"
          defaultMessage={`Enter a name for your Security Key`} />),

    'security.unknown_credential_type': (
        <FormattedMessage
          id="security.unknown_credential_type"
          defaultMessage={`Credential with unknown type`} />),

    'security.webauthn_credential_type': (
        <FormattedMessage
          id="security.webauthn_credential_type"
          defaultMessage={`Security Key`} />),

    'security.add_webauthn_token': (
        <FormattedMessage
          id="security.add_webauthn_token"
          defaultMessage={`Add Security Key`} />),

    'security.webauthn-describe-title': (
        <FormattedMessage
          id="security.webauthn-describe-title"
          defaultMessage={`Enter a name for your Security Key`} />),

    'security.webauthn.max_allowed_tokens': (
        <FormattedMessage
          id="security.webauthn.max_allowed_tokens"
          defaultMessage={`You are not allowed to register more Security Keys.`} />),

    'security.webauthn_register_success': (
        <FormattedMessage
          id="security.webauthn_register_success"
          defaultMessage={`Security Key successfully registered`} />),

    'security.webauthn-token-removed': (
        <FormattedMessage
          id="security.webauthn-token-removed"
          defaultMessage={`Security Key successfully removed`} />),

    'security.webauthn-missing-pdata': (
        <FormattedMessage
          id="security.webauthn-missing-pdata"
          defaultMessage={`You have to update your personal information before adding a Security Key`} />),

    'security.webauthn-token-notfound': (
        <FormattedMessage
          id="security.webauthn-token-notfound"
          defaultMessage={`Security token not found`} />),

    'security.webauthn-noremove-last': (
        <FormattedMessage
          id="security.webauthn-noremove-last"
          defaultMessage={`You are not allowed to remove your only security token`} />),

    'chpass.suggested_password': (
        <FormattedMessage
          id="chpass.suggested_password"
          defaultMessage={`Suggested password`} />),

   'chpass.custom_password': (
        <FormattedMessage
          id="chpass.custom_password"
          defaultMessage={`Custom password`} />),

   'chpass.use-custom': (
        <FormattedMessage
          id="chpass.use-custom"
          defaultMessage={`Custom`} />),

   'chpass.use-suggested': (
        <FormattedMessage
          id="chpass.use-suggested"
          defaultMessage={`Suggested`} />),

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

   'chpass.no_old_pw': (
        <FormattedMessage
          id="chpass.no_old_pw"
          defaultMessage={`Please enter the old password`} />),

   'chpass.no_reauthn': (
        <FormattedMessage
          id="chpass.no_reauthn"
          defaultMessage={`You must re-authenticate to change your password`} />),

   'chpass.stale_reauthn': (
        <FormattedMessage
          id="chpass.stale_reauthn"
          defaultMessage={`Stale re-authentication. Please re-initiate the process.`} />),

   'chpass.stale_authn_info': (
        <FormattedMessage
          id="chpass.stale_authn_info"
          defaultMessage={`Stale re-authentication. Please re-initiate the process.`} />),

   'chpass.password-changed': (
        <FormattedMessage
          id="chpass.password-changed"
          defaultMessage={`Password successfully changed`} />),

   'chpass.different-repeat': (
        <FormattedMessage
          id="chpass.different-repeat"
          defaultMessage={`Passwords differ`} />),

   'chpass.unable-to-verify-old-password': (
        <FormattedMessage
          id="chpass.unable-to-verify-old-password"
          defaultMessage={`There were problems trying to verify your old credentials. If you are certain that they are correct, please contact the administrator`} />),

   'pwfield.enter_password': (
        <FormattedMessage
          id="pwfield.enter_password"
          defaultMessage={`Enter password`} />),

   'pwfield.repeat_password': (
        <FormattedMessage
          id="pwfield.repeat_password"
          defaultMessage={`Repeat password`} />),

   'pwfield.terrible': (
        <FormattedMessage
          id="pwfield.terrible"
          defaultMessage={`Extremely weak password`} />),

   'pwfield.bad': (
        <FormattedMessage
          id="pwfield.bad"
          defaultMessage={`Very weak password`} />),

   'pwfield.weak': (
        <FormattedMessage
          id="pwfield.weak"
          defaultMessage={`Weak password`} />),

   'pwfield.good': (
        <FormattedMessage
          id="pwfield.good"
          defaultMessage={`Fairly strong password`} />),

   'pwfield.strong': (
        <FormattedMessage
          id="pwfield.strong"
          defaultMessage={`Strong password`} />),

   'pwfield.repeat_different': (
        <FormattedMessage
          id="pwfield.repeat_different"
          defaultMessage={`Repeated pasword is different`} />),

    /************************/
    /* Nins *****************/
    /************************/

   'nins.main_title': (
        <FormattedMessage
          id="nins.main_title"
          defaultMessage={`National identity number`} />),

   'nins.justification': (
        <FormattedMessage
          id="nins.justification"
          defaultMessage={`Some service providers (e.g. Antagning.se) require a confirmed identity.`} />),

   'nins.nin': (
        <FormattedMessage
          id="nins.nin"
          defaultMessage={"Number"} />),

   'nins.input_help_text': (
        <FormattedMessage
          id="nins.input_help_text"
          defaultMessage={"National identity number with 12 digits"} />),

   'nins.verified': (
        <FormattedMessage
          id="nins.verified"
          defaultMessage={`Verified`} />),

   'nins.primary': (
        <FormattedMessage
          id="nins.primary"
          defaultMessage={`Primary`} />),

   'nins.help_text': (
        <FormattedMessage
          id="nins.help_text"
          defaultMessage={`Add your Swedish national identity number and initiate the confirmation process using one of the buttons below.`} />),

   'nins.invalid_nin': (
        <FormattedMessage
          id="nins.invalid_nin"
          defaultMessage={`Invalid NIN`} />),

   'nins.wrong_length': (
        <FormattedMessage
          id="nins.wrong_length"
          defaultMessage={`NINs must have 12 digits`} />),

   'nins.illegal_chars': (
        <FormattedMessage
          id="nins.illegal_chars"
          defaultMessage={`NINs can only have digits`} />),

   'nins.valid_nin': (
        <FormattedMessage
          id="nins.valid_nin"
          defaultMessage={`Valid NIN`} />),

   'nins.confirmed_nin': (
        <FormattedMessage
          id="nins.confirmed_nin"
          defaultMessage={`NIN (Confirmed)`} />),

   'nins.unconfirmed_nin': (
        <FormattedMessage
          id="nins.unconfirmed_nin"
          defaultMessage={`Unconfirmed NIN`} />),

   'nins.button_delete': (
        <FormattedMessage
          id="nins.button_delete"
          defaultMessage={`Remove`} />),

   'nins.only_one_to_verify': (
        <FormattedMessage
          id="nins.only_one_to_verify"
          defaultMessage={`You can only have one unverified NIN to verify it. Please remove the unwanted ones.`} />),

   'nins.success_removal': (
        <FormattedMessage
          id="nins.success_removal"
          defaultMessage={`Successfully removed NIN`} />),

   'nins.no-mobile-match': (
        <FormattedMessage
          id="nins.no-mobile-match"
          defaultMessage={`No phone number matching NIN`} />),

   'nins.verified_no_rm': (
        <FormattedMessage
          id="nins.verified_no_rm"
          defaultMessage={`You cannot remove your verified National identity number`} />),

    /************************/
    /* Letter proofing ******/
    /************************/

   'letter.letter_button_text': (
        <FormattedMessage
          id="letter.letter_button_text"
          defaultMessage={`Confirm using letter`} />),

    'letter.initialize_proofing_help_text': (
        <FormattedMessage
          id="letter.initialize_proofing_help_text"
          defaultMessage={`To use this option you will have to wait for a letter sent to your official address.`} />),

   'letter.no_state_found': (
        <FormattedMessage
          id="letter.no_state_found"
          defaultMessage={`No state found`} />),

   'letter.letter_sent_msg': (
        <FormattedMessage
          id="letter.letter_sent_msg"
          defaultMessage={`You have been sent a verification letter`} />),

   'letter.already-sent': (
        <FormattedMessage
          id="letter.already-sent"
          defaultMessage={`You have already been sent a verification letter`} />),

   'letter.no-address-found': (
        <FormattedMessage
          id="letter.no-address-found"
          defaultMessage={`No postal address found`} />),

   'letter.bad-postal-address': (
        <FormattedMessage
          id="letter.bad-postal-address"
          defaultMessage={`The postal address is incomprehensible`} />),

   'letter.saved-unconfirmed': (
        <FormattedMessage
          id="letter.saved-unconfirmed"
          defaultMessage={`Saved unconfirmed NIN`} />),

   'letter.wrong-code': (
        <FormattedMessage
          id="letter.wrong-code"
          defaultMessage={`Incorrect verification code`} />),

   'letter.verification_success': (
        <FormattedMessage
          id="letter.verification_success"
          defaultMessage={`Successfully verified NIN`} />),

    /************************/
    /* Header ******** ******/
    /************************/

   'header.students': (
        <FormattedMessage
          id="header.students"
          defaultMessage={`Students`} />),

   'header.technicians': (
        <FormattedMessage
          id="header.technicicans"
          defaultMessage={`Technicians`} />),

   'header.staff': (
        <FormattedMessage
          id="header.staff"
          defaultMessage={`Staff`} />),

   'header.faq': (
        <FormattedMessage
          id="header.faq"
          defaultMessage={`FAQ`} />),

   'header.logout': (
        <FormattedMessage
          id="header.logout"
          defaultMessage={`Logout`} />),

    /************************/
    /* Footer ******** ******/
    /************************/

   'foot.change-version': (
        <FormattedMessage
          id="foot.change-version"
          defaultMessage={`Use old version of the app`} />),

   'foot.change-version-tip': (
        <FormattedMessage
          id="foot.change-version-tip"
          defaultMessage={`This is an experimental version. If you experience any problem while using the app, you can switch to the old version.`} />),

   'pending.pdata': (
        <FormattedMessage
          id="pending.pdata"
          defaultMessage={`Add personal information`} />),

   'pending.emails': (
        <FormattedMessage
          id="pending.emails"
          defaultMessage={`Add an email address`} />),

   'pending.nins': (
        <FormattedMessage
          id="pending.nins"
          defaultMessage={`Add a national identity number`} />),

   'pending.phones': (
        <FormattedMessage
          id="pending.phones"
          defaultMessage={`Add a phone number`} />),

   'pending_confirm.emails': (
        <FormattedMessage
          id="pending_confirm.emails"
          defaultMessage={`Confirm email address`} />),

   'pending_confirm.nins': (
        <FormattedMessage
          id="pending_confirm.nins"
          defaultMessage={`Confirm national identity number`} />),

   'pending_confirm.phones': (
        <FormattedMessage
          id="pending_confirm.phones"
          defaultMessage={`Confirm phone number`} />),

   'main.unconfirmed': (
        <FormattedMessage
          id="main.unconfirmed"
          defaultMessage={`Unconfirmed`} />),

   'main.confirmed': (
        <FormattedMessage
          id="main.confirmed"
          defaultMessage={`Confirmed`} />),

   'pfilled.completion': (
        <FormattedMessage
          id="pfilled.completion"
          defaultMessage={`Completion`} />),

   'csrf.try-again': (
        <FormattedMessage
          id="csrf.try-again"
          defaultMessage={`There was a problem with your submission, please try again`} />),
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
    'cm.lost_code': {
        id: "cm.lost_code",
        defaultMessage: `Lost your confirmation code?`,
        description: "Lost code problem description"
    },
    'cm.resend_code': {
        id: "cm.resend_code",
        defaultMessage: `Resend confirmation code`,
        description: "Lost code problem solution"
    },
    'letter.confirm_title': {
        id: "letter.confirm_title",
        defaultMessage: `Confirm identity with code sent by letter`,
        description: "Title for letter proofing confirm dialog"
    },
    'letter.confirm_info': {
        id: "letter.confirm_info",
        defaultMessage: `If you click "accept" below, you will be sent a letter by physical mail with a confirmation code. Once you receive it come back here and click again on "confirm using letter", and you will be offered a form to enter your code and verify your identity. The code sent to you will expire in 2 weeks starting now.`,
        description: "Explanation for letter proofing confirm dialog"
    },
    'letter.verify_title': {
        id: "letter.verify_title",
        defaultMessage: `Verify your identity with the code you have received by physical mail`,
        description: "Title for letter proofing verify dialog"
    },
    'letter.lost_code': {
        id: "letter.lost_code",
        defaultMessage: `When you click on the "Send code" link a letter with a verification code will be sent to your official postal address.`,
        description: "Text for letter proofing confirm dialog"
    },
    'letter.resend_code': {
        id: "letter.resend_code",
        defaultMessage: `Send code`,
        description: "Text for letter code resend button"
    },
    'letter.placeholder': {
        id: "letter.placeholder",
        defaultMessage: `Letter confirmation code`,
        description: "Placeholder for letter proofing text input"
    },

    "pd.given_name": {
          id:"pd.given_name",
          defaultMessage:`Given Name`
    },

    "pd.surname": {
          id:"pd.surname",
          defaultMessage:`Surname`
    },

    "pd.display_name": {
          id:"pd.display_name",
          defaultMessage:`Display Name`
    },

    "pd.language": {
          id:"pd.language",
          defaultMessage:`Language`
    },

    'pd.choose-language': {
          id: "pd.choose-language",
          defaultMessage: `Choose language`
    },

    "pd.display_name_input_placeholder": {
          id: "pd.display_name_inputplaceholder",
          defaultMessage: `Given name Surname`
    },

    "nins.input_placeholder": {
          id: "nins.input_placeholder",
          defaultMessage: `yyyymmddnnnn`
    },

    "phones.input_placeholder": {
          id: "phones.input_placeholder",
          defaultMessage: `Phone number`
    }
});
