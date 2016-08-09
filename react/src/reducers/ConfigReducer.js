
import * as actions from "actions/ConfigActions";


const configData = {
    is_fetching: false,
    failed: false,
    available_languages: []
};


let configReducer = (state=configData, action) => {
  switch (action.type) {
    case actions.GET_CONFIG:
      return {
          ...state, 
          is_fetching: true
      };
    case actions.GET_CONFIG_SUCCESS:
      return {
          ...action.payload,
          is_fetching: false,
      };
    case actions.GET_CONFIG_FAIL:
      return {
          ...state,
          is_fetching: false,
          failed: true
      };
    default:
      return state;
  }
};

export default configReducer;

