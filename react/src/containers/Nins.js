
import { connect } from 'react-redux';
import Nins from 'components/Nins';
import { postmobilesuscription, postLetter } from "actions/Nins";

const mapStateToProps = (state, props) => {
  return {
    emails: state.emails.emails,
    is_fetching: state.emails.is_fetching,
    errorMsg: state.emails.error,
    confirming: state.emails.confirming,
    resending: state.emails.resending,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
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

