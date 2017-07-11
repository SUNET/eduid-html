
import { connect } from 'react-redux';
import OpenidConnectFreja from 'components/OpenidConnectFreja';
import { postOpenidFreja, getOpenidFreja } from "actions/OpenidConnectFreja";


const mapStateToProps = (state, props) => {
  return {
    iaRequestData: state.openid_freja_data.iaRequestData,
    is_fetching: state.openid_freja_data.is_fetching,
    errorMsg: state.openid_freja_data.error
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleInitializeFrejaProofing: function (e) {
      dispatch(postOpenidFreja());
    },
    handleFetchFrejaProofing: function (e) {
      dispatch(getOpenidFreja());
    }
  }
};

const OpenidConnectFrejaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenidConnectFreja);

export default OpenidConnectFrejaContainer;

