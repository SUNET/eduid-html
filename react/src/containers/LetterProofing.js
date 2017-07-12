
import { connect } from 'react-redux';
import LetterProofingButton from 'components/LetterProofing';
import { startPostLetterProofing, stopPostLetterProofing } from "actions/LetterProofing";


const mapStateToProps = (state, props) => {
  return {
    confirmingLetter: state.letter_proofing.confirmingLetter,
    valid_nin: state.nins.valid_nin,
    is_fetching: state.letter_proofing.is_fetching,
    errorMsg: state.letter_proofing.error
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLetterProofing: function (e) {
      dispatch(startPostLetterProofing());
    },
    handleStopConfirmationLetter: function (e) {
      dispatch(stopPostLetterProofing());
    }
  }
};

const LetterProofingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterProofingButton);

export default LetterProofingContainer;
