
import * as actions from "actions/Nins";


const nins = {
    is_fetching: false,
    failed: false,
    error: "",
    // as default, a gif with a single pixel.
};


let NinsReducer = (state=nins, action) => {
  switch (action.type) {
    case actions.POST_MOBILE_SUSCRIPTION:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_MOBILE_SUSCRIPTION_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.POST_MOBILE_SUSCRIPTION_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.message
      };
    default:
      return state;
    case actions.POST_LETTER:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_LETTER_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.POST_LETTER_FAIL:
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

export default NinsReducer;

