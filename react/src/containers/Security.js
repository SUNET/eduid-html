
import { connect } from 'react-redux';
import Security from 'components/Security';
import { confirmPasswordChange, removeAccount, stopConfirmation, startConfirmation,
         startConfirmationPassword,
         stopConfirmationPassword } from "actions/Security";


const mapStateToProps = (state, props) => {
  return {
     credentials: state.security.credentials,
     confirming_change: state.security.confirming_change,
     is_fetching: state.security.is_fetching,
     errorMsg: state.security.error,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleRemove: function (e) {
      let data = {};
      dispatch(removeAccount(data));
    },
     handleStartConfirmation: function (e) {
        let data = {}

        dispatch(startConfirmation(data));

    },
    handleStopConfirmation: function (e) {
        dispatch(stopConfirmation());
    },
     handleStartConfirmationPassword: function (e) {
        dispatch(startConfirmationPassword());
    },
    handleStopConfirmationPassword: function (e) {
        dispatch(stopConfirmationPassword());
    },
    handleConfirmationPassword: (e) => {
        dispatch(confirmPasswordChange());
    },
  }

};

const SecurityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Security);

export default SecurityContainer;
