
import { connect } from 'react-redux';
import Security from 'components/Security';
import { confirmPasswordChange, startConfirmationPassword, stopConfirmationPassword,
         confirmDeletion, stopConfirmationDeletion, startConfirmationDeletion }
       from "actions/Security";


const mapStateToProps = (state, props) => {
  return {
     credentials: state.security.credentials,
     confirming_change: state.security.confirming_change,
     confirming_deletion: state.security.confirming_deletion,
     is_fetching: state.security.is_fetching,
     errorMsg: state.security.error,
     redirect_to: state.security.location,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
     handleStartConfirmationPassword: function (e) {
        dispatch(startConfirmationPassword());
    },
    handleStopConfirmationPassword: function (e) {
        dispatch(stopConfirmationPassword());
    },
    handleConfirmationPassword: (e) => {
        dispatch(confirmPasswordChange());
    },
    handleStartConfirmationDeletion: function (e) {
        dispatch(startConfirmationDeletion());
    },
    handleStopConfirmationDeletion: function (e) {
        dispatch(stopConfirmationDeletion());
    },
    handleConfirmationDeletion: function (e) {
        dispatch(confirmDeletion());
    },
  }

};

const SecurityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Security);

export default SecurityContainer;
