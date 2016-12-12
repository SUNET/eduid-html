
import * as actions from "actions/Emails";


const emailsData = {
    is_fetching: false,
    failed: false,
    confirming: '',
    error: '',
    emails: [],
    email: '',
};


let emailsReducer = (state=emailsData, action) => {
  switch (action.type) {
    case actions.GET_EMAILS:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.GET_EMAILS_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false,
        confirming: ''
      };
    case actions.GET_EMAILS_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true
      };
    case actions.CHANGE_EMAIL:
      return {
        ...state,
        ...action.payload
      };
    case actions.POST_EMAIL:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_EMAIL_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false,
        confirming: ''
      };
    case actions.POST_EMAIL_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true
      };
    case actions.START_CONFIRMATION:
      return {
        ...state,
        confirming: action.payload.email
      };
    default:
      return state;
  }
};

export default emailsReducer;

