
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import i18n from 'i18n-messages';
import TextInput from 'components/EduIDTextInput';
import EduIDButton from 'components/EduIDButton';
import TableList from 'components/TableList';
import ConfirmModal from 'components/ConfirmModal';

import 'style/Mobile.scss';


const validate = values => {
    const errors = {},
          phone = values.mobile,
          pattern = /^\+\d{10,20}$|^07[0236]\d{7}$|\+\d{2}\s\d{8,18}$/;
    if (!phone) {
        errors.mobile = 'required';
    } else if (!pattern.test(phone)) {
        errors.mobile = 'phones.invalid_phone'
    }
    return errors;
};

let PhoneForm = props => {
    let spinning = false;
    if (props.is_fetching) spinning = true;
    return (
        <form id="mobilesview-form"
              className="form-horizontal"
              role="form">
          <fieldset id="mobile-form" className="tabpane">
            <Field component={TextInput}
                   componentClass="input"
                   type="text"
                   label={props.l10n('phones.phone_label')}
                   name="mobile" />
            <EduIDButton bsStyle="primary"
                         id="mobile-button"
                         spinning={spinning}
                         disabled={!props.valid_phone}
                         onClick={props.handleAdd}>
                {props.l10n('mobile.button_add')}
            </EduIDButton>
          </fieldset>
        </form>
    );
}

PhoneForm = reduxForm({
  form: 'phones',
  validate
})(PhoneForm)

PhoneForm = connect(
  state => ({
    initialValues: {mobile: state.phones.phone},
    enableReinitialize: true
  })
)(PhoneForm)


class Mobile extends Component {

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
        <div className="mobileview-form-container ">
              <div className="intro">
              <h4>{this.props.l10n('phones.main_title')}</h4>
                <p>{this.props.l10n('phones.long_description')}</p>
                <p>{this.props.l10n('faq_link')}
                <a href="https://www.eduid.se/faq.html">FAQ</a></p>
          </div>
            <TableList entries={this.props.phones}
                       handleStartConfirmation={this.props.handleStartConfirmation}
                       handleRemove={this.props.handleRemove}
                       handleMakePrimary={this.props.handleMakePrimary}
                       errorMsg={this.props.errorMsg} />
            <div className="form-content">
            <PhoneForm {...this.props} />
            </div>
            <ConfirmModal
                modalId="phoneConfirmDialog"
                controlId="phoneConfirmDialogControl"
                title={this.props.l10n('mobile.confirm_title', {phone: this.props.confirming})}
                resendHelp={this.props.l10n('cm.lost_code')}
                resendText={this.props.l10n('cm.resend_code')}
                placeholder={this.props.l10n('mobile.placeholder')}
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

Mobile.propTypes = {
  phones: PropTypes.array,
  errorMsg: PropTypes.string,
  confirming: PropTypes.string,
  resending: PropTypes.object,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func,
  handleRemoveMobile: PropTypes.func
}

export default i18n(Mobile);
