
import { connect } from 'react-redux';
import Emails from 'components/Emails';
import { postEmail, changeEmail, startConfirmation, stopConfirmation, startResendEmailCode,
         finishConfirmation, startVerify, requestRemoveEmail, startRemove, makePrimary } from "actions/Emails";

const mapStateToProps = (state, props) => {
  return {
    emails: state.emails.emails,
    is_fetching: state.emails.is_fetching,
    errorMsg: state.emails.error,
    confirming: state.emails.confirming,
    resending: state.emails.resending,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleAdd: (e) => {
        dispatch(postEmail());
    },
    handleChange: function (e) {
        const data = {
            email: e.target.value
        };
        dispatch(changeEmail(data));
    },
    handleResend: function (e) {
        e.preventDefault();
        dispatch(startResendEmailCode());
    },
    handleStartConfirmation: function (e) {
        const dataNode = e.target.closest("tr.emailrow"),
              data = {
                  identifier: dataNode.getAttribute('data-identifier'),
                  email: dataNode.getAttribute('data-object')
              };
        dispatch(startConfirmation(data));

    },
    handleStopConfirmation: function (e) {
        dispatch(stopConfirmation());
    },
    handleFinishConfirmation: function (e) {
        dispatch(finishConfirmation());
    },
    handleConfirm: function (e) {
        const data = {
            code: document.body.querySelectorAll('#emailConfirmDialog input')[0].value
        };
        dispatch(startVerify(data))
    },
    handleRemove: function (e) {
        const dataNode = e.target.closest("tr.emailrow"),
              data = {
                  email: dataNode.getAttribute('data-object')
              };
        dispatch(startRemove(data))
    },
    handleMakePrimary: (e) => {
        const dataNode = e.target.closest("tr.emailrow"),
              data = {
                  email: dataNode.getAttribute('data-object')
              };
        dispatch(makePrimary(data))
    },
  }
};

const EmailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Emails);

export default EmailsContainer;

