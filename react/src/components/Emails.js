
import React, { PropTypes } from 'react';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import TextControl from 'components/TextControl';
import TableList from 'components/TableList';
import ConfirmModal from 'components/ConfirmModal';

import 'style/Emails.scss';


let Emails = React.createClass({

  render: function () {

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
                               label={this.props.l10n('emails.email_label')}
                               componentClass="input"
                               type="text"
                               handleChange={this.props.handleChange} />
                  <EduIDButton bsStyle="primary"
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
                closeModal={this.props.handleStopConfirmation}
                handleResendCode={this.props.handleResend}
                handleConfirm={this.props.handleConfirm}
                resending={this.props.resending}
                confirming={this.props.confirming} />
        </div>
    );
  }
});

Emails.propTypes = {
  emails: PropTypes.array,
  errorMsg: PropTypes.string,
  confirming: PropTypes.string,
  resending: PropTypes.object,
  handleChange: PropTypes.func,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func
}

export default i18n(Emails);
