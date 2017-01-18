
import { connect } from 'react-redux';
import Emails from 'components/Emails';
import { postEmail, changeEmail, startConfirmation, stopConfirmation, startResendEmailCode } from "actions/Emails";

const mapStateToProps = (state, props) => {
  return {
    emails: state.emails.emails,
    is_fetching: state.emails.is_fetching,
    errorMsg: state.emails.error,
    confirming: state.emails.confirming,
    resending: state.emails.resending
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
        dispatch(startResendEmailCode());
    },
    handleStartConfirmation: function (e) {
        let data = {}
        if (e.target.parentNode.parentNode.parentNode.getAttribute('data-identifier') == null){
            data = {
                identifier: e.target.parentNode.parentNode.getAttribute('data-identifier'),
                email: e.target.parentNode.parentNode.getAttribute('data-object')
            };
        }else{
           data = {
                identifier: e.target.parentNode.parentNode.parentNode.getAttribute('data-identifier'),
                email: e.target.parentNode.parentNode.parentNode.getAttribute('data-object')
            };
        }

        dispatch(startConfirmation(data));

    },
    handleStopConfirmation: function (e) {
        dispatch(stopConfirmation());
    },
    handleConfirm: function (e) {
        const data = {
            code: document.body.querySelectorAll('#email-confirmation-code input')[0].value
            // code: window.getElementById('email-confirm-code').value,
            // XXX email: e.target.parentNode.parentNode.getAttribute('data-object')
        };
    },
  }
};

const EmailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Emails);

export default EmailsContainer;

