
import * as actions from "actions/Nins";


const ninState = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    valid_nin: true,
    nin: '',
    rmNin: '',
    nins: []
};


let ninsReducer = (state=ninState, action) => {
  switch (action.type) {
    case actions.GET_NINS:
      return {
        ...state,
        is_fetching: true
      };
    case actions.GET_NINS_SUCCESS:
      const nins = action.payload.nins,
            nin = (nins.length) ? nins[0].number : state.nin;
      return {
        ...state,
        ...action.payload,
        nin: nin,
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
    case actions.POST_NIN_REMOVE:
      return {
        ...state,
        rmNin: action.payload.nin,
        is_fetching: true
      };
    case actions.POST_NIN_REMOVE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        valid_nin: true
      };
    case actions.POST_NIN_REMOVE_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        error: action.payload.error,
      };
    default:
      return state;
  }
};
export default ninsReducer;
