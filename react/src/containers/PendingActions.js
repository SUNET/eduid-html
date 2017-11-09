
import { connect } from 'react-redux';
import PendingActions from 'components/PendingActions';
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
      pending: state.profile.pending
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

const PendingActionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingActions);

export default i18n(PendingActionsContainer);
