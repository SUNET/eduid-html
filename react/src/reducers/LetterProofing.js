
import * as actions from "actions/LetterProofing";


const letterData = {
    confirmingLetter: false,
    verifyingLetter: false,
    code: '',
    letter_sent: '',
    letter_expires: '',
    letter_expired: false,
    is_fetching: false,
    failed: false,
    error: "",
    message: '',
    resending: {
      is_fetching: false,
      failed: false,
      error: {},
      message: ''
    },
};


let letterProofingReducer = (state=letterData, action) => {
  switch (action.type) {
    case actions.STOP_LETTER_CONFIRM:
      return {
        ...state,
        confirmingLetter: false,
        is_fetching: false,
        failed: false
      };
    case actions.STOP_LETTER_PROOFING:
      return {
        ...state,
        verifyingLetter: false,
        is_fetching: false,
        failed: false
      };
    case actions.GET_LETTER_PROOFING_CODE:
      return {
        ...state,
        is_fetching: true,
        failed: false
      };
    case actions.POST_LETTER_PROOFING_CODE:
      return {
        ...state,
        is_fetching: false,
        failed: false,
        resending: {
            ...state.resending,
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
            ...state.resending,
            is_fetching: true,
            failed: false
        }
      };
    case actions.GET_LETTER_PROOFING_PROOFING_SUCCESS:
      let verifying = false,
          confirming = false;
      if (action.payload.letter_sent === undefined) {
        confirming = true;
      } else {
        verifying = true;
      }
      return {
        ...state,
        is_fetching: false,
        failed: false,
        verifyingLetter: verifying,
        confirmingLetter: confirming
      };
    case actions.POST_LETTER_PROOFING_PROOFING_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        confirmingLetter: false
      };
    case actions.POST_LETTER_PROOFING_PROOFING_SUCCESS:
      return {
        ...state,
        ...action.payload,
        is_fetching: false,
        failed: false,
        confirmingLetter: false,
        verifyingLetter: false,
        resending: {
            ...state.resending,
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
            ...state.resending,
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
            ...state.resending,
            is_fetching: true,
            failed: false
        }
      };
    case actions.POST_LETTER_PROOFING_CODE_SUCCESS:
      return {
        ...state,
        is_fetching: false,
        failed: false,
        confirmingLetter: false,
        message: action.payload.message,
        resending: {
            ...state.resending,
            is_fetching: false,
            failed: false,
        }
      };
    case actions.POST_LETTER_PROOFING_CODE_FAIL:
      return {
        ...state,
        is_fetching: false,
        failed: true,
        resending: {
            ...state.resending,
            is_fetching: false,
            failed: true,
            message: action.payload.message
        }
      };
    default:
      return state;
  }
};

export default letterProofingReducer;
