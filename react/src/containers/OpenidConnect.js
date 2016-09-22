
import { connect } from 'react-redux';
import OpenidConnect from 'components/OpenidConnect';
import { fetchOpenidQRCode } from "actions/OpenidConnect";


const mapStateToProps = (state, props) => {
  return {
    qrcode: state.openid_data.qrcode,
    nonce: state.openid_data.nonce
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleGetQRCode: function (e) {
      dispatch(fetchOpenidQRCode());
    }
  }
};

const OpenidConnectContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenidConnect);

export default OpenidConnectContainer;

