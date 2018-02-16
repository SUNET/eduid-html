
import { connect } from 'react-redux';
import Security from 'components/Security';
import { confirmPasswordChange, startConfirmationPassword, stopConfirmationPassword,
         confirmDeletion, stopConfirmationDeletion, startConfirmationDeletion }
       from "actions/Security";
import { eduidRMAllNotify } from "actions/Notifications";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
     credentials: state.security.credentials,
     confirming_change: state.security.confirming_change,
     confirming_deletion: state.security.confirming_deletion,
     is_fetching: state.security.is_fetching,
     redirect_to: state.security.location,
     deleted: state.security.deleted
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
     handleStartConfirmationPassword: function (e) {
        dispatch(eduidRMAllNotify());
        dispatch(startConfirmationPassword());
    },
    handleStopConfirmationPassword: function (e) {
        dispatch(stopConfirmationPassword());
    },
    handleConfirmationPassword: (e) => {
        dispatch(confirmPasswordChange());
    },
    handleStartConfirmationDeletion: function (e) {
        dispatch(eduidRMAllNotify());
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

export default i18n(SecurityContainer);
