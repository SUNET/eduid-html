
import { connect } from 'react-redux';
import { isValid } from "redux-form";
import LetterProofingButton from 'components/LetterProofing';
import * as actions from "actions/LetterProofing";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  const confirming = state.letter_proofing.confirmingLetter,
        valid_nin = isValid('nins')(state),
        confirmingLetter = confirming && valid_nin;
  return {
    confirmingLetter: confirmingLetter,
    valid_nin: isValid('nins')(state),
    nin: state.nins.nin,
    is_fetching: state.letter_proofing.is_fetching,
    resending: state.letter_proofing.resending,
    letter_sent: state.letter_proofing.letter_sent,
    letter_expires: state.letter_proofing.letter_expires,
    letter_expired: state.letter_proofing.letter_expired
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLetterProofing: function (e) {
      dispatch(actions.postSendLetterProofing());
    },
    handleStopConfirmationLetter: function (e) {
      dispatch(actions.stopPostLetterProofing());
    },
    sendConfirmationLetter: function (e) {
      e.preventDefault();
        const data = {
            code: document.getElementById('confirmation-code-area').querySelector('input').value
        };
      dispatch(actions.postLetterProofing(data));
      dispatch(actions.stopPostLetterProofing());
    }
  }
};

const LetterProofingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterProofingButton);

export default i18n(LetterProofingContainer);
