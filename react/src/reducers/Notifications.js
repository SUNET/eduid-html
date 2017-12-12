
import * as actions from "actions/Notifications";


const notifications = {
    messages: [],
    warnings: [],
    errors: []
};


const notificationsReducer = (state=notifications, action) => {
  switch (action.type) {
    case actions.NEW_NOTIFICATION:
      switch (action.payload.level) {
        case "errors":
          return {
            messages: [],
            warnings: [],
            errors: [ action.payload.message ]
          };
        case "warnings":
          const warnings = state.warnings.slice();
          warnings.push(action.payload.message);
          return {
            ...state,
            warnings: warnings
          };
        case "messages":
          return {
            messages: [ action.payload.message ],
            warnings: [],
            errors: []
          };
        default:
          return state;
      }
    case actions.RM_NOTIFICATION:
      const msgs = state[action.payload.level].slice();
      msgs.splice(action.payload.index, 1);
      let newState = {...state};
      newState[action.payload.level] = msgs;
      return newState;
    case "@@router/LOCATION_CHANGE":
      return {
        messages: [],
        warnings: [],
        errors: []
      };
    default:
      return state;
  }
};
export default notificationsReducer;

