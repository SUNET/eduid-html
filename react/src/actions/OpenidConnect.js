
export const POST_OIDC_PROOFING_PROOFING = 'POST_OIDC_PROOFING_PROOFING';
export const POST_OIDC_PROOFING_PROOFING_SUCCESS = 'POST_OIDC_PROOFING_PROOFING_SUCCESS';
export const POST_OIDC_PROOFING_PROOFING_FAIL = 'POST_OIDC_PROOFING_PROOFING_FAIL';


export function postOpenid () {
  return {
    type: POST_OIDC_PROOFING_PROOFING
  };
}

export function postOpenidFail (err) {
  return {
    type: POST_OIDC_PROOFING_PROOFING_FAIL,
    error: true,
    payload: {
      error: err,
      message: err
    }
  };
}
