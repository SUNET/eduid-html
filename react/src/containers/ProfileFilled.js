
import { connect } from 'react-redux';
import ProfileFilled from 'components/ProfileFilled';

const mapStateToProps = (state, props) => {
  return {
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

const ProfileFilledContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileFilled);

export default ProfileFilledContainer;

