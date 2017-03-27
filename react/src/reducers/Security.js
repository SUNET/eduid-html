
import * as actions from "actions/Security";


const security = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    csrf_token: '',
    credentials: [],
    code: '',
    confirming_change: false,
};


let securityReducer = (state=security, action) => {
  switch (action.type) {
    case actions.GET_CREDENTIALS:
      return {
        ...state,
        is_fetching: true
      };
    case actions.GET_CREDENTIALS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.GET_CREDENTIALS_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true
      };
    case actions.START_CHANGE_PASSWORD:
      return {
        ...state,
        confirming_change: true
      };
    case actions.STOP_CHANGE_PASSWORD:
      return {
        ...state,
        confirming_change: false
      };
    case actions.GET_CHANGE_PASSWORD:
      return {
        ...state,
        confirming_change: false,
        is_fetching: true
      };
    case actions.GET_CHANGE_PASSWORD_FAIL:
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
export default securityReducer;
