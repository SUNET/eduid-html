
import * as actions from "actions/Nins";


const nins = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    nins: []
};


let ninsReducer = (state=nins, action) => {
  switch (action.type) {
    case actions.GET_NINS:
      return {
        ...state,
        is_fetching: true
      };
    case actions.GET_NINS_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.GET_NINS_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
        message: action.payload.message
      };
    default:
      return state;
  }
};
export default ninsReducer;
