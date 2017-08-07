
import { connect } from 'react-redux';
import Mobile from 'components/Mobile';
import { makePrimary, postMobile, changeMobile, startResendMobileCode, finishConfirmation,
         startConfirmation, stopConfirmation, startVerify, startRemove } from "actions/Mobile";


const mapStateToProps = (state, props) => {
  const pdata_fetching = state.personal_data ?
                         state.personal_data.is_fetching :
                         false;
  return {
    phones: state.phones.phones,
    is_fetching: state.phones.is_fetching || pdata_fetching,
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
            code: document.getElementById('phoneConfirmDialogControl').value
        };
        dispatch(startVerify(data))
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

export default MobileContainer;

