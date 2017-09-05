
import { connect } from 'react-redux';
import Notifications from 'components/Notifications';

const mapStateToProps = (state, props) => {
  return {
      messages: state.notifications.messages,
      warnings: state.notifications.warnings,
      errors: state.notifications.errors
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

const NotificationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);

export default NotificationsContainer;
