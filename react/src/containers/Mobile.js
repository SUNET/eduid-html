
import { connect } from 'react-redux';
import Mobile from 'components/Mobile';
import { makePrimary, postMobile, changeMobile, startResendMobileCode, finishConfirmation,
         startConfirmation, stopConfirmation, startVerify, startRemove } from "actions/Mobile";


const mapStateToProps = (state, props) => {
  return {
    phones: state.phones.phones,
    is_fetching: state.phones.is_fetching,
    errorMsg: state.phones.error,
    confirming: state.phones.confirming,
    resending: state.phones.resending,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleAdd: (e) => {
        dispatch(postMobile());
    },
    handleChange: function (e) {
        const data = {
            phone: e.target.value
        };
        dispatch(changeMobile(data));
    },
    handleResend: function (e) {
        dispatch(startResendMobileCode());
    },
    handleStartConfirmation: function (e) {
        let data = {}
        if (e.target.parentNode.parentNode.parentNode.getAttribute('data-identifier') == null){
            data = {
                identifier: e.target.parentNode.parentNode.getAttribute('data-identifier'),
                phone: e.target.parentNode.parentNode.getAttribute('data-object')
            };
        }else{
           data = {
                identifier: e.target.parentNode.parentNode.parentNode.getAttribute('data-identifier'),
                phone: e.target.parentNode.parentNode.parentNode.getAttribute('data-object')
            };
        }

        dispatch(startConfirmation(data));
    },
    handleStopConfirmation: function (e) {
        dispatch(stopConfirmation());
    },
    handleFinishConfirmation: function (e) {
        dispatch(finishConfirmation());
    },
    handleConfirm: function (e) {
        const data = {
            code: document.body.querySelectorAll('#email-confirmation-code input')[0].value
        };
        dispatch(startVerify(data))
    },
    handleRemove: function (e) {
        let data = {}
        if (e.target.parentNode.parentNode.parentNode.getAttribute('data-identifier') == null){
            data = {
                phone: e.target.parentNode.parentNode.getAttribute('data-object')
            };
        }else{
           data = {
                phone: e.target.parentNode.parentNode.parentNode.getAttribute('data-object')
            };
        }
        dispatch(startRemove(data))
    },
    handleMakePrimary: (e) => {
        let data = {}
        if (e.target.parentNode.parentNode.parentNode.getAttribute('data-identifier') == null){
            data = {
                phone: e.target.parentNode.parentNode.getAttribute('data-object')
            };
        }else{
           data = {
                phone: e.target.parentNode.parentNode.parentNode.getAttribute('data-object')
            };
        }
        dispatch(makePrimary(data))
    }
  }
};

const MobileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mobile);

export default MobileContainer;

