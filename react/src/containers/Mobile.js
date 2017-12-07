
import { connect } from 'react-redux';
import { isValid } from "redux-form";
import Mobile from 'components/Mobile';
import { makePrimary, postMobile, changeMobile, startResendMobileCode, finishConfirmation,
         startConfirmation, stopConfirmation, startVerify, startRemove } from "actions/Mobile";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  const pdata_fetching = state.personal_data ?
                         state.personal_data.is_fetching :
                         false;
  return {
    phones: state.phones.phones,
    valid_phone: isValid('phones')(state),
    phone: state.phones.phone,
    is_fetching: state.phones.is_fetching || pdata_fetching,
    confirming: state.phones.confirming,
    resending: state.phones.resending,
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleAdd: (e) => {
        dispatch(postMobile());
    },
    handleResend: function (e) {
        e.preventDefault();
        dispatch(startResendMobileCode());
    },
    handleStartConfirmation: function (e) {
        const dataNode = e.target.closest("tr.emailrow"),
              data = {
                  identifier: dataNode.getAttribute('data-identifier'),
                  phone: dataNode.getAttribute('data-object')
              };

        dispatch(startConfirmation(data));
    },
    handleStopConfirmation: function (e) {
        dispatch(stopConfirmation());
    },
    handleConfirm: function (e) {
        const data = {
            code: document.getElementById('confirmation-code-area').querySelector('input').value
        };
        dispatch(startVerify(data));
        dispatch(stopConfirmation());
    },
    handleRemove: function (e) {
        const dataNode = e.target.closest("tr.emailrow"),
              data = {
                  phone: dataNode.getAttribute('data-object')
              };
        dispatch(startRemove(data))
    },
    handleMakePrimary: (e) => {
        const dataNode = e.target.closest("tr.emailrow"),
              data = {
                  phone: dataNode.getAttribute('data-object')
              };
        dispatch(makePrimary(data))
    }
  }
};

const MobileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Mobile);

export default i18n(MobileContainer);
