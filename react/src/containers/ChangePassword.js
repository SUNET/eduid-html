
import { connect } from 'react-redux';
import ChangePassword from 'components/ChangePassword';


const mapStateToProps = (state, props) => {
  return {
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleRemove: function (e) {
      let data = {};
      dispatch(removeAccount(data));
    },
  }
};

const ChangePasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

export default ChangePasswordContainer;

