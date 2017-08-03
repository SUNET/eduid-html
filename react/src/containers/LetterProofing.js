
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
    nin: state.nins.nin,
    is_fetching: state.letter_proofing.is_fetching,
    message: state.letter_proofing.message,
    errMsg: state.letter_proofing.errMsg,
    resending: state.letter_proofing.resending,
    letter_sent: state.letter_proofing.letter_sent,
    letter_expires: state.letter_proofing.letter_expires,
    letter_expired: state.letter_proofing.letter_expired
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
      e.preventDefault();
      dispatch(actions.postSendLetterProofing());
    },
    sendConfirmationLetter: function (e) {
      e.preventDefault();
        const data = {
            code: document.getElementById('letterConfirmDialogControl').value
        };
      dispatch(actions.postLetterProofing(data));
    }
  }
};

const LetterProofingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterProofingButton);

export default LetterProofingContainer;
