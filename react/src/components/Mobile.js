
import React, { PropTypes } from 'react';

import i18n from 'i18n-messages';
import EduIDButton from 'components/EduIDButton';
import TextControl from 'components/TextControl';
import TableList from 'components/TableList';
import ConfirmModal from 'components/ConfirmModal';

import 'style/Mobile.scss';


let Mobile = React.createClass({

  render: function () {

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
              <form id="mobilesview-form"
                    className="form-horizontal"
                    role="form">
                <fieldset id="mobile-form" className="tabpane">
                  <TextControl name="mobile"
                               label={this.props.l10n('mobile.mobile_label')}
                               componentClass="input"
                               type="text"
                               handleChange={this.props.handleChange} />
                  <EduIDButton bsStyle="primary"
                               id="mobile-button"
                          onClick={this.props.handleAdd}>
                      {this.props.l10n('mobile.button_add')}
                  </EduIDButton>
                </fieldset>
              </form>
            </div>
            <ConfirmModal
                title={this.props.l10n('mobile.confirm_title', {phone: this.props.confirming})}
                placeholder={this.props.l10n('mobile.placeholder')}
                showModal={Boolean(this.props.confirming)}
                finishModal={this.props.handleFinishConfirmation}
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
  phones: PropTypes.array,
  errorMsg: PropTypes.object,
  confirming: PropTypes.string,
  resending: PropTypes.object,
  handleChange: PropTypes.func,
  handleResend: PropTypes.func,
  handleAdd: PropTypes.func,
  handleStartConfirmation: PropTypes.func,
  handleStopConfirmation: PropTypes.func,
  handleRemoveMobile: PropTypes.func
}

export default i18n(Mobile);
