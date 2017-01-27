import * as actions from "actions/Mobile";

const mobileData = {
    is_fetching: false,
    failed: false,
    error: '',
    message: '',
    resending: {
      is_fetching: false,
      failed: false,
      error: {},
      message: ''
    },
    confirming: '',
    mobiles: [],
    mobile: '',
    code: '',
}

let mobileReducer = (state=mobileData, action) => {
    switch (action.type) {
    case actions.GET_MOBILES:
      return {
        ...state,
        is_fetching: true
      };
    case actions.GET_MOBILES_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false
      };
    case actions.GET_MOBILES_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true
      };
        default:
      return state;
  }
};
export default mobileReducer;
