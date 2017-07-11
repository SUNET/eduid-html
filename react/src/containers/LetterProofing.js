
import { connect } from 'react-redux';
import LetterProofingButton from 'components/LetterProofing';
import { postLetterProofing } from "actions/LetterProofing";


const mapStateToProps = (state, props) => {
  return {
    is_fetching: state.letter_proofing.is_fetching,
    errorMsg: state.letter_proofing.error
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleLetterProofing: function (e) {
      dispatch(postLetterProofing());
    }
  }
};

const LetterProofingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LetterProofingButton);

export default LetterProofingContainer;
