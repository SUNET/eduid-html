
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import i18n from 'i18n-messages';
import TextInput from 'components/EduIDTextInput';
import EduIDButton from 'components/EduIDButton';
import TableList from 'components/TableList';
import ConfirmModal from 'components/ConfirmModal';

import 'style/Emails.scss';


const validate = values => {
    const errors = {},
          email = values.email,
          pattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email) {
        errors.email = 'required';
    } else if (!pattern.test(email)) {
        errors.email = 'emails.invalid_email'
    }
    return errors;
};

let EmailForm = props => {
    let spinning = false;
    if (props.is_fetching) spinning = true;
    return (
        <form id="emailsview-form"
              className="form-horizontal"
              role="form">
          <fieldset id="emails-form" className="tabpane">
            <Field component={TextInput}
                   componentClass="input"
                   type="text"
                   label={props.l10n('emails.email_label')}
                   name="email" />
            <EduIDButton bsStyle="primary"
                         id="email-button"
                         spinning={spinning}
                         disabled={!props.valid_email}
                         onClick={props.handleAdd}>
                {props.l10n('emails.button_add')}
            </EduIDButton>
          </fieldset>
        </form>
    );
}

EmailForm = reduxForm({
  form: 'emails',
  validate
})(EmailForm)

EmailForm = connect(
  state => ({
    initialValues: {email: state.emails.email},
    enableReinitialize: true
  })
)(EmailForm)


class Emails extends Component {

  render () {

    let message = '',
        messageArgs = {},
        levelMessage = 'success';

    if (this.props.resending.message) {
      message = this.props.resending.message;
      messageArgs = {email: this.props.confirming};
      levelMessage = 'success';
    }

    return (
        <div className="emailsview-form-container ">
          <div className="intro">
              <h4>{this.props.l10n('emails.main_title')}</h4>
                <p>{this.props.l10n('emails.long_description')}</p>
                <p>{this.props.l10n('faq_link')}
                <a href="https://www.eduid.se/faq.html">FAQ</a></p>
          </div>
            <TableList entries={this.props.emails}
                       handleStartConfirmation={this.props.handleStartConfirmation}
                       handleRemove={this.props.handleRemove}
                       handleMakePrimary={this.props.handleMakePrimary}
                       errorMsg={this.props.errorMsg} />
            <div className="form-content">
            <EmailForm {...this.props} />
            </div>
            <ConfirmModal
                modalId="emailConfirmDialog"
                controlId="emailConfirmDialogControl"
                title={this.props.l10n('emails.confirm_title', {email: this.props.confirming})}
                resendHelp={this.props.l10n('cm.lost_code')}
                resendText={this.props.l10n('cm.resend_code')}
                placeholder={this.props.l10n('emails.placeholder')}
                showModal={Boolean(this.props.confirming)}
                closeModal={this.props.handleStopConfirmation}
                handleResend={this.props.handleResend}
                handleConfirm={this.props.handleConfirm}
                is_fetching={this.props.resending.is_fetching}
                message={message}
                messageArgs={messageArgs}
                LevelMessage={levelMessage} />
        </div>
    );
  }
}

Emails.propTypes = {
  longDescription: PropTypes.string,
  emails: PropTypes.array,
  errorMsg: PropTypes.string,
  confirming: PropTypes.string,
  resending: PropTypes.object,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func,
  handleRemoveEmail: PropTypes.func
}

export default i18n(Emails);
