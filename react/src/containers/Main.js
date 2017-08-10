
import { connect } from 'react-redux';
import Main from 'components/Main';

const mapStateToProps = (state, props) => {
  return {
    language: state.config.language
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default MainContainer;
