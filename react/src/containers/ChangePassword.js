
import { connect } from 'react-redux';
import ChangePassword from 'components/ChangePassword';
import * as actions from 'actions/ChangePassword'


const mapStateToProps = (state, props) => {
  return {
    choose_custom: state.chpass.choose_custom,
    suggested_password: state.chpass.suggested_password,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleChoice: function (e) {
      if (e.target.checked) {
        dispatch(actions.chooseCustomPassword());
      } else {
        dispatch(actions.chooseSuggestedPassword());
      }
    },
  }
};

const ChangePasswordContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangePassword);

export default ChangePasswordContainer;

