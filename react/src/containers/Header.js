
import { connect } from 'react-redux';
import Header from 'components/Header';

const mapStateToProps = (state, props) => {
  return {
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
