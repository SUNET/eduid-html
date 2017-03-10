
import { connect } from 'react-redux';
import Nins from 'components/Nins';
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
  }
};

const NinsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nins);

export default NinsContainer;

