
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal } from 'react-bootstrap';

import TextControl from 'components/TextControl';
import EduIDButton from 'components/EduIDButton';


let ConfirmModal = React.createClass({

  render: function () {
    // i18n messages
    const lost_code = (
            <FormattedMessage
              id="cm.lost_code"
              defaultMessage={`Lost your confirmation code?`} />),

          resend_code = (
            <FormattedMessage
              id="cm.resend_code"
              defaultMessage={`Resend confirmation code`} />),

          ok = (
            <FormattedMessage
              id="cm.ok"
              defaultMessage={`OK`} />),

          finish = (
            <FormattedMessage
              id="cm.finish"
              defaultMessage={`FINISH`} />),

          cancel = (
            <FormattedMessage
              id="cm.cancel"
              defaultMessage={`CANCEL`} />);

    let spinning = false;
    if (this.props.is_fetching) spinning = true;

    return (
      <div id="askDialog"
           className={this.props.modalClasses}
           tabIndex="-1"
           role="dialog"
           aria-labelledby="askDialogPrompt"
           aria-hidden="true"
           data-backdrop="true">

            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <input className="xlarge"
                           id="askDialogInput"
                           name="xlInput"
                           type="text"
                           placeholder={this.props.placeholder} />
                    <p>
                        {lost_code}
                        <a href="#"
                           className="resend-code">
                            {resend_code}
                        </a>
                    </p>
                    <p className="extra-info"></p>
                </Modal.Body>

                <Modal.Footer>
                    <Button className="finish-button">
                         {finish}
                    </Button>
                    <Button className="cancel-button">
                         {cancel}
                    </Button>
                    <EduIDButton bsStyle="primary"
                          className="ok-button"
                          spinning={spinning}
                          onClick={this.props.handleConfirm}>
                        {ok}
                    </EduIDButton>
                </Modal.Footer>

            </Modal.Dialog>
      </div>
    );
  }
});

ConfirmModal.propTypes = {
  title: PropTypes.object,
  placeholder: PropTypes.string,
  handleConfirm: PropTypes.func,
  errorMsg: PropTypes.string,
  is_fetching: PropTypes.bool
}

export default ConfirmModal;
