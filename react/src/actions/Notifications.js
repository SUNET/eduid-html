

export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';

export function eduidNotify (msg, level) {
  return {
    type: NEW_NOTIFICATION,
    payload: {
      message: msg,
      level: level
    }
  };
}
