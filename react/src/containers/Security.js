
import { connect } from 'react-redux';
import Security from 'components/Security';
import { changepassword, removeAccount, stopConfirmation, startConfirmation,
         startConfirmationPassword,
         stopConfirmationPassword } from "actions/Security";


const mapStateToProps = (state, props) => {
  return {
     credentials: state.security.credentials,
     is_fetching: state.security.is_fetching,
     errorMsg: state.security.error,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleChange: (e) => {
      let data = {};
      dispatch(changepassword(data));
    },
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
        let data = {}

        dispatch(startConfirmationPassword(data));

    },
    handleStopConfirmationPassword: function (e) {
        dispatch(stopConfirmationPassword());
    },
  }

};

const SecurityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Security);

export default SecurityContainer;
