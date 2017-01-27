
import { connect } from 'react-redux';
import Mobile from 'components/Mobile';
import { postEmail, changeMobile, startResendMobileCode, startConfirmation, stopConfirmation, startVerify, startRemove } from "actions/Mobile";


const mapStateToProps = (state, props) => {
  return {
    mobiles: state.mobile.mobiles,
    is_fetching: state.mobile.is_fetching,
    errorMsg: state.mobile.error,
    confirming: state.mobile.confirming,
    resending: state.mobile.resending,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleAdd: (e) => {
        dispatch(postMobile());
    },
    handleChange: function (e) {
        const data = {
            email: e.target.value
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
                mobile: e.target.parentNode.parentNode.getAttribute('data-object')
            };
        }else{
           data = {
                identifier: e.target.parentNode.parentNode.parentNode.getAttribute('data-identifier'),
                mobile: e.target.parentNode.parentNode.parentNode.getAttribute('data-object')
            };
        }

        dispatch(startConfirmation(data));
    },
    handleStopConfirmation: function (e) {
        dispatch(stopConfirmation());
    },
    handleConfirm: function (e) {
        const data = {
            code: document.body.querySelectorAll('#mobile-confirmation-code input')[0].value
        };
        dispatch(startVerify(data))
    },
    handleRemoveMobile: function (e) {
        let data = {}
        if (e.target.parentNode.parentNode.parentNode.getAttribute('data-identifier') == null){
            data = {
                mobile: e.target.parentNode.parentNode.getAttribute('data-object')
            };
        }else{
           data = {
                mobile: e.target.parentNode.parentNode.parentNode.getAttribute('data-object')
            };
        }
        dispatch(startRemove(data))
    },
    handleMakePrimaryMobile: (e) => {
        let data = {}
        if (e.target.parentNode.parentNode.parentNode.getAttribute('data-identifier') == null){
            data = {
                mobile: e.target.parentNode.parentNode.getAttribute('data-object')
            };
        }else{
           data = {
                mobile: e.target.parentNode.parentNode.parentNode.getAttribute('data-object')
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

