
import * as actions from "actions/Profile";


const profile = {
    max: 0,
    cur: 0,
    pending: []
};


let profileReducer = (state=profile, action) => {
  switch (action.type) {
    case actions.PROFILE_FILLED:
        return {
            ...state,
            max: action.payload.max,
            cur: action.payload.cur,
            pending: action.payload.pending
        };
    default:
        return state;
  }
};
export default profileReducer;
