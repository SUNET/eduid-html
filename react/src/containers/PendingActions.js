
import { connect } from 'react-redux';
import PendingActions from 'components/PendingActions';

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

export default PendingActionsContainer;


