
import * as actions from "actions/Notifications";

const notifyAndDispatch = store => next => action => {
    if (action.type !== actions.NEW_NOTIFICATION) {
        if (action.error && action.payload) {
            const msg = action.payload.errorMsg || action.payload.message;
            if (msg) {
                next(actions.eduidNotify(msg, 'danger'));
            }
        } else if (action.payload && action.payload.message) {
            next(actions.eduidNotify(action.payload.message, 'success'));
        }
        if (action.payload !== undefined) {
            delete(action.payload.message);
            delete(action.payload.errorMsg);
        }
    }
    return next(action);
};

export default notifyAndDispatch;
