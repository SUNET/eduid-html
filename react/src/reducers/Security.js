
import * as actions from "actions/Security";


const security = {
    is_fetching: false,
    failed: false,
    credential: '',
    creation_date: '',
    last_used: '',
    csrf_token: '',
    error: '',
    confirming: false,
    change_password: false,
};


let securityReducer = (state=security, action) => {
  switch (action.type) {
    case actions.START_CHANGE_PASSWORD:
        return {
        ...state,
        change_password: true,
      };
    case actions.STOP_CHANGE_PASSWORD:
      return {
        ...state,
        change_password: false,
      };
    case actions.POST_CHANGE_PASSWORD:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.POST_CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error
      };
    case actions.START_DELETE_ACCOUNT:
        return {
        ...state,
        confirming: true,
      };
    case actions.STOP_DELETE_ACCOUNT:
      return {
        ...state,
        confirming: false,
      };
    case actions.POST_DELETE_ACCOUNT:
      return {
        ...state,
        is_fetching: true,
        failed: false,
      };
    case actions.POST_DELETE_ACCOUNT_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false,
      };
    case actions.POST_DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default securityReducer;
