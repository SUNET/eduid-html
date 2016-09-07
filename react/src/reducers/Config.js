
import * as actions from "actions/Config";


// see the config params in eduid-developer/etcd/conf.yaml
const configData = {
    is_fetching: false,
    failed: false
};


let configReducer = (state=configData, action) => {
  switch (action.type) {
    case actions.GET_CONFIG:
      return {
          ...state, 
          is_fetching: true,
          failed: false
      };
    case actions.GET_CONFIG_SUCCESS:
      return {
          ...action.payload,
          is_fetching: false,
          failed: false
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

