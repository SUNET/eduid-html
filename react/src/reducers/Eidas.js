
import * as actions from "actions/Eidas";


const eidasData = {
  is_fetching: false,
  failed: false,
  error: null,
  eidas_sp_freja_idp_url: "",
  showModal: false
};

let eidasReducer = (state=eidasData, action) => {
  switch (action.type) {
    case actions.SHOW_EIDAS_MODAL:
      return {
        ...state,
        failed: false
      };
    case actions.SHOW_EIDAS_MODAL_SUCCESS:
      return {
        ...state,
        error: null,
        showModal: true,
      };
    case actions.SHOW_EIDAS_MODAL_FAIL:
      return {
        ...state,
        failed: true,
        error: true,
        message: action.payload.message
      };
    case actions.HIDE_EIDAS_MODAL:
      return {
        ...state,
      };
    case actions.HIDE_EIDAS_MODAL_SUCCESS:
      return {
        ...state,
        showModal: false
      };
    default:
      return state;
  }
};

export default eidasReducer;

