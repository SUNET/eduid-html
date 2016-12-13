
import { connect } from 'react-redux';
import Emails from 'components/Emails';
import { postEmail, changeEmail, startConfirmation, stopConfirmation, startResendEmailCode } from "actions/Emails";


const mapStateToProps = (state, props) => {
  return {
    emails: state.emails.emails,
    is_fetching: state.emails.is_fetching,
    errorMsg: state.emails.error,
    confirming: state.emails.confirming
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
        const data = {
            identifier: e.target.parentNode.parentNode.getAttribute('data-identifier'),
            email: e.target.parentNode.parentNode.getAttribute('data-object')
        };
        dispatch(startConfirmation(data));
    },
    handleStopConfirmation: function (e) {
        dispatch(stopConfirmation());
    }
  }
};

const EmailsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Emails);

export default EmailsContainer;

