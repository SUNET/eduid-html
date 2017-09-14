

export const PROFILE_FILLED = 'PROFILE_FILLED';

export function profileFilled (max, cur, pending) {
  return {
    type: PROFILE_FILLED,
    payload: {
        max: max,
        cur: cur,
        pending: pending
    }
  };
}
