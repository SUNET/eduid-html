
import * as actions from "actions/ChangePassword";


const chpass = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    csrf_token: '',
    suggested_password: '',
    custom_choice: false,
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
    default:
      return state;
  }
};
export default chpassReducer;

