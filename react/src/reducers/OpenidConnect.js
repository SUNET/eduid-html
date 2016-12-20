
import * as actions from "actions/OpenidConnect";


const openidData = {
    is_fetching: false,
    failed: false,
    error: "",
    // as default, a gif with a single pixel.
    qr_img: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
    qr_code: ""
};


let openidConnectReducer = (state=openidData, action) => {
  switch (action.type) {
    case actions.POST_OIDC_PROOFING_PROOFING:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_OIDC_PROOFING_PROOFING_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.POST_OIDC_PROOFING_PROOFING_FAIL:
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

export default openidConnectReducer;

