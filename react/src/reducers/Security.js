
import * as actions from "actions/Security";


const security = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    credentials: [],
    code: '',
    confirming_change: false,
    confirming_deletion: false,
    location: '',
    deleted: false,
    u2f_is_fetching: false,
    u2f_failed: false,
    u2f_is_enrolled: false,
    u2f_request: {}
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
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.START_CHANGE_PASSWORD:
      return {
        ...state,
        confirming_change: true
      };
    case actions.STOP_CHANGE_PASSWORD:
      return {
        ...state,
        is_fetching: false,
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
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.START_DELETE_ACCOUNT:
      return {
        ...state,
        confirming_deletion: true
      };
    case actions.STOP_DELETE_ACCOUNT:
      return {
        ...state,
        confirming_deletion: false
      };
    case actions.POST_DELETE_ACCOUNT:
      return {
        ...state,
        is_fetching: true,
        failed: false,
        confirming_deletion: false
      };
    case actions.POST_DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        confirming_deletion: false,
        is_fetching: false,
        failed: false,
        location: action.payload.location
      };
    case actions.POST_DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.GET_DELETE_ACCOUNT:
      return {
        ...state,
        is_fetching: true,
        failed: false,
        confirming_deletion: false
      };
    case actions.GET_DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        confirming_deletion: false,
        is_fetching: false,
        failed: false,
        deleted: true
      };
    case actions.GET_DELETE_ACCOUNT_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.START_U2F_REGISTRATION:
      return {
        ...state,
        u2f_is_fetching: true,
        u2f_failed: false
      };
    case actions.STOP_U2F_REGISTRATION:
      return {
        ...state,
        u2f_is_fetching: false,
        u2f_is_enrolled: false,
        u2f_failed: false
      };
    case actions.GET_U2F_ENROLL_FAIL:
      return {
        ...state,
        u2f_is_fetching: false,
        u2f_failed: true,
        u2f_is_enrolled: false,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.GET_U2F_ENROLL_SUCCESS:
      action.payload.registerRequests.forEach(function (rr) {
          rr.appId = action.payload.appId;
      });
      return {
        ...state,
        u2f_is_fetching: false,
        u2f_failed: false,
        u2f_is_enrolled: true,
        u2f_request: action.payload
      };
    case actions.GET_U2F_REGISTER_FAIL:
      return {
        ...state,
        u2f_is_fetching: false,
        u2f_failed: true,
        u2f_is_enrolled: false,
        error: action.payload.error,
        message: action.payload.message
      };
    case actions.POST_U2F_BIND_SUCCESS:
      return {
        ...state,
        ...action.payload,
        u2f_failed: false,
        u2f_is_enrolled: false,
        u2f_is_fetching: false,
        is_fetching: false
      };
    default:
      return state;
  }
};
export default securityReducer;
