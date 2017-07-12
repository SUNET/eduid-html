
import { connect } from 'react-redux';
import Nins from 'components/Nins';


const mapStateToProps = (state, props) => {
  return {
     nins: state.nins.nins,
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
