
import { connect } from 'react-redux';
import Nins from 'components/Nins';
import { postmobilesuscription, postLetter, startVerify, stopVerify, verifyLetterCode } from "actions/Nins";

const mapStateToProps = (state, props) => {
  return {
    letter_sent: state.nins.letter_sent,
    is_fetching: state.nins.is_fetching,
    errorMsg: state.nins.error,
    confirming: state.nins.confirming,
    resending: state.nins.resending,
    verifying: state.nins.verifying,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
      handleStopCodeConfirmation: function () {
        dispatch(stopVerify());
      },
      handleStartCodeConfirmation: function () {
          dispatch(startVerify());
      },
    verifyCode: (e) => {
        let data = {};
        if(e.target.parentNode.getElementsByTagName('input')[0] == undefined) {
          data = {
            nins: e.target.parentNode.parentNode.getElementsByTagName('input')[0].value
          }
        } else {
          data = {
            nins: e.target.parentNode.getElementsByTagName('input')[0].value
          }
        }
        dispatch(verifyLetterCode(data));
    },
    handlePhoneSuscription: (e) => {
        let data = {};
        if(e.target.parentNode.getElementsByTagName('input')[0] == undefined) {
          data = {
            nins: e.target.parentNode.parentNode.getElementsByTagName('input')[0].value
          }
        } else {
          data = {
            nins: e.target.parentNode.getElementsByTagName('input')[0].value
          }
        }
        dispatch(postmobilesuscription(data));
    },
    handleLetter: (e) => {
        let data = {};
        if(e.target.parentNode.getElementsByTagName('input')[0] == undefined) {
          data = {
            nins: e.target.parentNode.parentNode.getElementsByTagName('input')[0].value
          }
        } else {
          data = {
            nins: e.target.parentNode.getElementsByTagName('input')[0].value
          }
        }
        dispatch(postLetter(data));
    },
  }
};

const NinsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nins);

export default NinsContainer;

