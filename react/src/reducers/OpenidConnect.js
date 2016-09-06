
import * as actions from "actions/OpenidConnect";


const openidData = {
    is_fetching: false,
    failed: false,
    qrcode: ''
};


let openidConnectReducer = (state=openidData, action) => {
  switch (action.type) {
    case actions.POST_OPENID:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_OPENID_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.POST_OPENID_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true
      };
    default:
      return state;
  }
};

export default openidConnectReducer;

