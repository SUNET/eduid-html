
import { connect } from 'react-redux';
import Mobile from 'components/Mobile';
import { postEmail } from "actions/Mobile";


const mapStateToProps = (state, props) => {
  return {
    mobiles: state.mobile.mobiles,
    is_fetching: state.mobile.is_fetching,
    errorMsg: state.mobile.error,
    confirming: state.mobile.confirming,
    resending: state.mobile.resending,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleAdd: (e) => {
        dispatch(postMobile());
    },
  }
};

const MobileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mobile);

export default MobileContainer;

