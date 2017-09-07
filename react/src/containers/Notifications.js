
import { connect } from 'react-redux';
import Notifications from 'components/Notifications';
import * as actions from 'actions/Notifications';

const mapStateToProps = (state, props) => {
  return {
      messages: state.notifications.messages,
      warnings: state.notifications.warnings,
      errors: state.notifications.errors
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
      handleRMNotification (e) {
          const note = e.target.closest('div.alert'),
                level = note.dataset.level,
                index = note.dataset.index;
          dispatch(actions.eduidRMNotify(level, index));
      }
  }
};

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default NotificationsContainer;
