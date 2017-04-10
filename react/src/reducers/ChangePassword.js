
import * as actions from "actions/ChangePassword";


const chpass = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    csrf_token: '',
    suggested_password: '',
    old_password: '',
    new_password: '',
    choose_custom: false,
};


let chpassReducer = (state=chpass, action) => {
  switch (action.type) {
    case actions.GET_SUGGESTED_PASSWORD:
      return {
        ...state,
        is_fetching: true
      };
    case actions.GET_SUGGESTED_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.GET_SUGGESTED_PASSWORD_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true
      };
    case actions.CHOOSE_SUGGESTED_PASSWORD:
      return {
        ...state,
        new_password: action.payload,
        choose_custom: false
      };
    case actions.CHOOSE_CUSTOM_PASSWORD:
      return {
        ...state,
        new_password: '',
        choose_custom: true
      };
    case actions.VALID_CUSTOM_PASSWORD:
      return {
        ...state,
        new_password: action.payload,
      };
    case actions.PASSWORD_NOT_READY:
      return {
        ...state,
        is_fetching: false,
        failed: false,
        error: actions.payload,
        new_password: '',
      };
    case actions.POST_PASSWORD_CHANGE:
      return {
        ...state,
        old_password: action.payload.old,
        new_password: action.payload.next,
      };
    case actions.START_PASSWORD_CHANGE:
      return {
        ...state,
        is_fetching: true,
        failed: false,
      };
    case actions.POST_PASSWORD_CHANGE_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true
      };
    default:
      return state;
  }
};
export default chpassReducer;

