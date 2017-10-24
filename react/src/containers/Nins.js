
import { connect } from 'react-redux';
import { isValid } from "redux-form";
import Nins from 'components/Nins';
import * as actions from "actions/Nins";



const mapStateToProps = (state, props) => {
  const pdata_fetching = state.personal_data ?
                         state.personal_data.is_fetching :
                         false;
  return {
     nins: state.nins.nins,
     is_configured: state.config.is_configured,
     proofing_methods: state.config.PROOFING_METHODS,
     valid_nin: isValid('nins')(state),
     nin: state.nins.nin,
     is_fetching: state.nins.is_fetching || pdata_fetching,
     message: state.nins.message
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
      handleDelete: function (e) {
          const nin = e.target.closest('.nin-holder').dataset.ninnumber;
          dispatch(actions.startRemove(nin));
      }
  }
};

const NinsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nins);

export default NinsContainer;
