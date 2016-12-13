
import * as actions from "actions/Emails";


const emailsData = {
    is_fetching: false,
    failed: false,
    resending: false,
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
        is_fetching: true
      };
    case actions.GET_EMAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
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
        is_fetching: true
      };
    case actions.POST_EMAIL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
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
    case actions.STOP_CONFIRMATION:
      return {
        ...state,
        confirming: ''
      };
    case actions.START_RESEND_EMAIL_CODE:
      return {
        ...state,
        resending: true
      };
    default:
      return state;
  }
};

export default emailsReducer;

