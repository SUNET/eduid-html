
import { connect } from 'react-redux';
import OpenidConnectFreja from 'components/OpenidConnectFreja';
import { postOpenidFreja, getOpenidFreja, showOpenidFrejaModal, hideOpenidFrejaModal } from "actions/OpenidConnectFreja";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
    iaRequestData: state.openid_freja_data.iaRequestData,
    is_fetching: state.openid_freja_data.is_fetching,
    nin: state.openid_freja_data.nin,
    showModal: state.openid_freja_data.showModal,
    error: state.openid_freja_data.error,
    // Used until we deploy the nin component
    proofing_methods: state.config.PROOFING_METHODS
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    handleInitializeFrejaProofing: function (e) {
      dispatch(postOpenidFreja());
    },
    handleFetchFrejaProofing: function (e) {
      dispatch(getOpenidFreja());
    },
    handleShowModal: function (e) {
      dispatch(showOpenidFrejaModal());
    },
    handleHideModal: function (e) {
      dispatch(hideOpenidFrejaModal());
    },
  }
};

const OpenidConnectFrejaContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenidConnectFreja);

export default i18n(OpenidConnectFrejaContainer);
