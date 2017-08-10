
import { connect } from 'react-redux';
import Footer from 'components/Footer';

import { setLanguage } from "actions/Config";

const mapStateToProps = (state, props) => {
  return {
    is_configured: state.config.is_configured,
    language: state.config.language,
    languages: state.config.AVAILABLE_LANGUAGES
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
      changeLanguage: function (e) {
          const lang = e.target.closest('.langselector').dataset.lang;
          dispatch(setLanguage(lang));
      }
  }
};

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

export default FooterContainer;

