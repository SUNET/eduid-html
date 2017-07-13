
import { connect } from 'react-redux';
import LetterProofingButton from 'components/LetterProofing';
import * as actions from "actions/LetterProofing";


const mapStateToProps = (state, props) => {
  const confirming = state.letter_proofing.confirmingLetter,
        valid_nin = state.nins.valid_nin,
        confirmingLetter = confirming && valid_nin;
  return {
    confirmingLetter: confirmingLetter,
    valid_nin: state.nins.valid_nin,
    is_fetching: state.letter_proofing.is_fetching,
    errorMsg: state.letter_proofing.error
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLetterProofing: function (e) {
      dispatch(actions.startPostLetterProofing());
    },
    handleStopConfirmationLetter: function (e) {
      dispatch(actions.stopPostLetterProofing());
    },
    handleConfirmationLetter: function (e) {
      dispatch(actions.postLetterProofing());
    }
  }
};

const LetterProofingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterProofingButton);

export default LetterProofingContainer;
