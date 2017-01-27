
import React, { PropTypes } from 'react';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import TextControl from 'components/TextControl';
import TableList from 'components/TableList';
import ConfirmModal from 'components/ConfirmModal';

import 'style/Emails.scss';


let Mobile = React.createClass({

  render: function () {

    return (
        <div className="emailsview-form-container ">
            <TableList entries={this.props.mobiles}
                       errorMsg={this.props.errorMsg} />
            <div className="form-content">
              <form id="emailsview-form"
                    className="form-horizontal"
                    role="form">
                <fieldset id="emails-form" className="tabpane">
                  <TextControl name="mobile"
                               label={this.props.l10n('mobile.mobile_label')}
                               componentClass="input"
                               type="text"/>
                  <EduIDButton bsStyle="primary"
                               id="email-button"
                          onClick={this.props.handleAdd}>
                      {this.props.l10n('emails.button_add')}
                  </EduIDButton>
                </fieldset>
              </form>
            </div>
            <ConfirmModal
                // title={this.props.l10n('mobile.confirm_title', {mobile: this.props.confirming})}
                placeholder={this.props.l10n('mobile.placeholder')}
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

Mobile.propTypes = {
  mobile: PropTypes.array,
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

export default i18n(Mobile);
