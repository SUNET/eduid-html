
import * as actions from "actions/PersonalDataActions";


const personalData = {
    is_fetching: false,
    failed: false,
    given_name: '',
    surname: '',
    display_name: '',
    language: 'sv'
};


let personalDataReducer = (state=personalData, action) => {
  switch (action.type) {
    case actions.SAVE_USERDATA:
      return {
        ...action.payload
      };
    case actions.GET_USERDATA:
      return {
        ...state,
        is_fetching: true
      };
    case actions.GET_USERDATA_SUCCESS:
      return {
          ...action.payload,
          is_fetching: false,
      };
    case actions.GET_USERDATA_FAIL:
      return {
          ...state,
          is_fetching: false,
          failed: true
      };
    default:
      return state;
  }
};

export default personalDataReducer;
