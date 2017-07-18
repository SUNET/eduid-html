
import * as actions from "actions/Nins";


const nins = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    valid_nin: false,
    nin: '',
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
      const nins = action.payload.nins,
            nin = (nins.length) ? nins[0].number : '',
            valid_nin = Boolean(nins.length);
      return {
        ...state,
        ...action.payload,
        nin: nin,
        valid_nin: valid_nin,
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
    case actions.VALID_NIN:
      return {
        ...state,
        is_fetching: false,
        failed: false,
        nin: action.payload.nin,
        valid_nin: true
      };
    case actions.INVALID_NIN:
      return {
        ...state,
        is_fetching: false,
        failed: false,
        valid_nin: false
      };
    default:
      return state;
  }
};
export default ninsReducer;
