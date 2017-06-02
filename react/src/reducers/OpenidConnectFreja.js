
import * as actions from "actions/OpenidConnectFreja";


const openidFrejaData = {
    is_fetching: false,
    failed: false,
    error: "",
    iaRequestData: "",
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
    default:
      return state;
  }
};

export default openidConnectFrejaReducer;

