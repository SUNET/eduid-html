
import * as actions from "actions/Nins";


const nins = {
    is_fetching: false,
    failed: false,
    error: "",
    nin: "",
    letter_expires: "",
    letter_sent: "",
    code: "",
    verifying: false,
    request_letter: false,
    // as default, a gif with a single pixel.
};


let NinsReducer = (state=nins, action) => {
  switch (action.type) {
    case actions.GET_NIN_STATE:
      return {
        ...state,
        is_fetching: true
      };
    case actions.GET_LETTER_PROOFING_PROOFING_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        letter_expires: action.payload.letter_expires,
        letter_sent: action.payload.letter_sent
      };
    case actions.GET_NIN_STATE_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true
      };
    case actions.POST_MOBILE_SUSCRIPTION:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_MOBILE_SUSCRIPTION_SUCCESS:
      return {
        ...state,
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
    case actions.POST_LETTER:
      return {
        ...state,
        is_fetching: true,
        request_letter: true,
        failed: false
      };
    case actions.POST_LETTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        request_letter: true,
        failed: false
      };
    case actions.POST_LETTER_FAIL:
      return {
        ...state,
        is_fetching: false,
        request_letter: true,
        failed: true,
        error: action.payload.error.nin[0]
      };
    case actions.START_CODE_VERIFY:
      return {
        ...state,
        is_fetching: true,
        verifying: true,
        failed: false
      };
    case actions.START_CODE_VERIFY_FAIL:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        verifying: false,
        failed: false
      };
    case actions.POST_LETTER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        failed: false
      };
  case actions.STOP_CODE_VERIFY:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        failed: false,
        verifying: false,
      };
    case actions.VERIFY_LETTER_CODE_FAIL:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        verifying: true,
        failed: true,
        error: action.payload.message
      };
    default:
      return state;
  };
 };

export default NinsReducer;

