
import { connect } from 'react-redux';
import Splash from 'components/Splash';
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
    return {
    }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
  }
};

const SplashContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Splash);

export default i18n(SplashContainer);
