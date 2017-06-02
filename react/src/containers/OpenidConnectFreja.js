
import { connect } from 'react-redux';
import OpenidConnectFreja from 'components/OpenidConnectFreja';
import { postOpenidFreja } from "actions/OpenidConnectFreja";


const mapStateToProps = (state, props) => {
  return {
    iaRequestData: state.openid_freja_data.iaRequestData,
    is_fetching: state.openid_freja_data.is_fetching,
    errorMsg: state.openid_freja_data.error
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleOpenFrejaApp: function (e) {
      dispatch(postOpenidFreja());
    }
  }
};

const OpenidConnectFrejaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenidConnectFreja);

export default OpenidConnectFrejaContainer;

