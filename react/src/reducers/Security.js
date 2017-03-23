
import * as actions from "actions/Security";


const security = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    csrf_token: '',
    credentials: [],
    code: '',
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
    default:
      return state;
  }
};
export default securityReducer;
