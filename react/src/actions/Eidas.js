
export const SHOW_EIDAS_MODAL = 'SHOW_EIDAS_MODAL';
export const SHOW_EIDAS_MODAL_SUCCESS = 'SHOW_EIDAS_MODAL_SUCCESS';
export const SHOW_EIDAS_MODAL_FAIL = 'SHOW_EIDAS_MODAL_FAIL';

export const HIDE_EIDAS_MODAL = 'HIDE_EIDAS_MODAL';
export const HIDE_EIDAS_MODAL_SUCCESS = 'HIDE_EIDAS_MODAL_SUCCESS';


export function showEidasModal () {
    return {
      type: SHOW_EIDAS_MODAL,
  };
}

export function showEidasModalSuccess () {
    return {
      type: SHOW_EIDAS_MODAL_SUCCESS
  };
}

export function showEidasModalFail (message) {
  return {
    type: SHOW_EIDAS_MODAL_FAIL,
    error: true,
    payload: {
      error: true,
      message: message
    }
  };
}

export function hideEidasModal () {
    return {
      type: HIDE_EIDAS_MODAL
  };
}

export function hideEidasModalSuccess () {
    return {
      type: HIDE_EIDAS_MODAL_SUCCESS
  };
}