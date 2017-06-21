
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import TextControl from 'components/TextControl';
import TableList from 'components/TableList';
import ConfirmModal from 'components/ConfirmModal';

import 'style/Emails.scss';


class Emails extends Component {

  render () {

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
              <form id="emailsview-form"
                    className="form-horizontal"
                    role="form">
                <fieldset id="emails-form" className="tabpane">
                  <TextControl name="email"
                               label={this.props.l10n('emails.email_label')}
                               componentClass="input"
                               type="text"
                               handleChange={this.props.handleChange} />
                  <EduIDButton bsStyle="primary"
                               id="email-button"
                          onClick={this.props.handleAdd}>
                      {this.props.l10n('emails.button_add')}
                  </EduIDButton>
                </fieldset>
              </form>
            </div>
            <ConfirmModal
                title={this.props.l10n('emails.confirm_title', {email: this.props.confirming})}
                placeholder={this.props.l10n('emails.placeholder')}
                showModal={Boolean(this.props.confirming)}
                finishModal={this.props.handleFinishConfirmation}
                closeModal={this.props.handleStopConfirmation}
                finishModal={this.props.handleFinishConfirmation}
                handleResendCode={this.props.handleResend}
                handleConfirm={this.props.handleConfirm}
                resending={this.props.resending}
                confirming={this.props.confirming} />
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
  handleChange: PropTypes.func,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func,
  handleRemoveEmail: PropTypes.func
}

export default i18n(Emails);
