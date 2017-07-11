
import * as actions from "actions/LetterProofing";


const letterData = {
    is_fetching: false,
    failed: false,
    error: ""
};


let letterProofingReducer = (state=letterData, action) => {
  switch (action.type) {
    case actions.POST_LETTER_PROOFING_PROOFING:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_LETTER_PROOFING_PROOFING_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false
      };
    case actions.POST_LETTER_PROOFING_PROOFING_FAIL:
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

export default letterProofingReducer;

