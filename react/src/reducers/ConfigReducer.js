
import Immutable from "immutable";
import * as actions from "actions/ConfigActions";


const configData = Immutable.Map({
    is_fetching: false,
    failed: false,
    available_languages: Immutable.List()
});


let configReducer = (state=configData, action) => {
  switch (action.type) {
    case actions.GET_CONFIG:
      return Object.assign({}, state, {
          is_fetching: true
      });
    case actions.GET_CONFIG_SUCCESS:
      return Object.assign({}, action.payload, {
          is_fetching: false,
      });
    case actions.GET_CONFIG_FAIL:
      return Object.assign({}, state, {
          is_fetching: false,
          failed: true
      });
    default:
      return state;
  }
};

export default configReducer;

