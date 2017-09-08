
import * as actions from "actions/PersonalData";


const personalData = {
    is_fetching: false,
    failed: false,
    error: '',
    eppn: '',
    given_name: '',
    surname: '',
    display_name: '',
    language: ''
};


let personalDataReducer = (state=personalData, action) => {
  switch (action.type) {
    case actions.GET_USERDATA_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.GET_ALL_USERDATA:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.GET_ALL_USERDATA_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.message
      };
    case actions.CHANGE_USERDATA:
      return {
        ...state,
        ...action.payload
      };
    case actions.POST_USERDATA:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_USERDATA_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.POST_USERDATA_FAIL:
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

export default personalDataReducer;
