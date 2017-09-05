
import * as actions from "actions/Notifications";


const notifications = {
    messages: [],
    warnings: [],
    errors: []
};


let notificationsReducer = (state=notifications, action) => {
  switch (action.type) {
    case actions.NEW_NOTIFICATION:
      switch (action.payload.level) {
        case "error":
          const errors = state.errors.slice();
          errors.push(action.payload.msg);
          return {
            ...state,
            errors: errors
          };
        case "warning":
          const warnings = state.warnings.slice();
          warnings.push(action.payload.msg);
          return {
            ...state,
            warnings: warnings
          };
        case "message":
          const messages = state.messages.slice();
          messages.push(action.payload.msg);
          return {
            ...state,
            messages: messages
          };
        default:
          return state;
      }
    default:
      return state;
  }
};
export default notificationsReducer;

