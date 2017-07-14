
import * as actions from "actions/LetterProofing";


const letterData = {
    confirmingLetter: false,
    is_fetching: false,
    failed: false,
    error: "",
    resending: {
      is_fetching: false,
      failed: false,
      error: {},
      message: ''
    },
};


let letterProofingReducer = (state=letterData, action) => {
  switch (action.type) {
    case actions.START_LETTER_PROOFING:
      return {
        ...state,
        confirmingLetter: true,
        is_fetching: false,
        failed: false
      };
    case actions.STOP_LETTER_PROOFING:
      return {
        ...state,
        confirmingLetter: false,
        is_fetching: false,
        failed: false
      };
    case actions.POST_LETTER_PROOFING_CODE:
      return {
        ...state,
        is_fetching: false,
        failed: false,
        resending: {
            is_fetching: false,
            failed: false
        }
      };
    case actions.WAIT_LETTER_PROOFING_PROOFING:
      return {
        ...state,
        is_fetching: false,
        failed: false,
        resending: {
            is_fetching: true,
            failed: false
        }
      };
    case actions.POST_LETTER_PROOFING_PROOFING_SUCCESS:
      return {
        ...action.payload,
        is_fetching: false,
        failed: false,
        resending: {
            is_fetching: false,
            failed: false
        }
      };
    case actions.POST_LETTER_PROOFING_PROOFING_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: false,
        resending: {
            is_fetching: false,
            failed: true,
            message: action.payload.message
        }
      };
    case actions.POST_LETTER_PROOFING_PROOFING:
      return {
        ...state,
        is_fetching: false,
        failed: false,
        code: action.payload.code,
        resending: {
            is_fetching: true,
            failed: false
        }
      };
    case actions.POST_LETTER_PROOFING_CODE_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        resending: {
            is_fetching: false,
            failed: true,
        }
      };
    default:
      return state;
  }
};

export default letterProofingReducer;
