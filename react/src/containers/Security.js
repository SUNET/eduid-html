
import { connect } from 'react-redux';
import Security from 'components/Security';
import { changepassword, removeAccount } from "actions/Security";


const mapStateToProps = (state, props) => {
  return {
     credential: state.security.credential,
     creation_date: state.security.creation_date,
     last_used:  state.security.last_used,
     is_fetching: state.security.is_fetching,
     errorMsg: state.security.error
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
    }
  }

};

const SecurityContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Security);

export default SecurityContainer;
