
export const NEW_NOTIFICATION = 'NEW_NOTIFICATION';
export const RM_NOTIFICATION = 'RM_NOTIFICATION';
export const RM_ALL_NOTIFICATION = 'RM_ALL_NOTIFICATION';

export function eduidNotify (msg, level) {
  return {
    type: NEW_NOTIFICATION,
    payload: {
      message: msg,
      level: level
    }
  };
}

export function eduidRMNotify (level, index) {
  return {
    type: RM_NOTIFICATION,
    payload: {
      level: level,
      index: index
    }
  };
}

export function eduidRMAllNotify () {
  return {
    type: RM_ALL_NOTIFICATION
  };
}
