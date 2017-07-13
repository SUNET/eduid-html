
import * as actions from "actions/OpenidConnectFreja";


const openidFrejaData = {
  is_fetching: false,
  failed: false,
  error: "",
  iaRequestData: "",
  showModal: false,
  nin: "",
};

let openidConnectFrejaReducer = (state=openidFrejaData, action) => {
  switch (action.type) {
    case actions.GET_OIDC_PROOFING_FREJA_PROOFING:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.GET_OIDC_PROOFING_FREJA_PROOFING_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.GET_OIDC_PROOFING_FREJA_PROOFING_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.message
      };
    case actions.POST_OIDC_PROOFING_FREJA_PROOFING:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_OIDC_PROOFING_FREJA_PROOFING_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.POST_OIDC_PROOFING_FREJA_PROOFING_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.message
      };
    case actions.SHOW_OIDC_FREJA_MODAL:
      return {
        ...state,
        failed: false
      };
    case actions.SHOW_OIDC_FREJA_MODAL_SUCCESS:
      return {
        ...state,
        nin: action.payload.nin,
        showModal: true,
      };
    case actions.SHOW_OIDC_FREJA_MODAL_FAIL:
      return {
        ...state,
        failed: true,
        error: action.payload.message
      };
    case actions.HIDE_OIDC_FREJA_MODAL:
      return {
        ...state,
        showModal: false
      };
    default:
      return state;
  }
};

export default openidConnectFrejaReducer;

