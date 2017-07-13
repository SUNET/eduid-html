
import { connect } from 'react-redux';
import Nins from 'components/Nins';


const mapStateToProps = (state, props) => {
  return {
     nins: state.nins.nins,
     proofing_methods: state.config.PROOFING_METHODS,
     is_fetching: state.nins.is_fetching,
     message: state.nins.message
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

const NinsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Nins);

export default NinsContainer;
