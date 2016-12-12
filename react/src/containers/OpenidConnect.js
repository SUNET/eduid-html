
import { connect } from 'react-redux';
import OpenidConnect from 'components/OpenidConnect';
import { postOpenid } from "actions/OpenidConnect";


const mapStateToProps = (state, props) => {
  return {
    qrcode: state.openid_data.qrcode,
    nonce: state.openid_data.nonce,
    is_fetching: state.openid_data.is_fetching,
    errorMsg: state.openid_data.error
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleGetQRCode: function (e) {
      dispatch(postOpenid());
    }
  }
};

const OpenidConnectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenidConnect);

export default OpenidConnectContainer;

