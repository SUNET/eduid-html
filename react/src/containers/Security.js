
import { connect } from 'react-redux';
import Security from 'components/Security';
import { changepassword, removeAccount, stopConfirmation, startConfirmation } from "actions/Security";


const mapStateToProps = (state, props) => {
  return {
     credential: state.security.credential,
     creation_date: state.security.creation_date,
     last_used:  state.security.last_used,
     is_fetching: state.security.is_fetching,
     errorMsg: state.security.error,
     confirming: state.security.confirming
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
  }

};

const SecurityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Security);

export default SecurityContainer;
