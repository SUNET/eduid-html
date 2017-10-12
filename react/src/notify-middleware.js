
import * as actions from "actions/Notifications";
import { profileFilled } from "actions/Profile";

const notifyAndDispatch = store => next => action => {
    if (action.type !== actions.NEW_NOTIFICATION) {
        if (action.error && action.payload) {
            const msg = action.payload.errorMsg || action.payload.message || 'error_in_form';
            if (msg) {
                next(actions.eduidNotify(msg, 'errors'));
            }
        } else if (action.payload && action.payload.message) {
            next(actions.eduidNotify(action.payload.message, 'messages'));
        }
        if (action.payload !== undefined) {
            delete(action.payload.message);
            delete(action.payload.errorMsg);
        }
    }
    return next(action);
};

export default notifyAndDispatch;
