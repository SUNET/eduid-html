
import { connect } from 'react-redux';
import { updateIntl } from 'react-intl-redux';
import Footer from 'components/Footer';
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  return {
    is_configured: state.config.is_configured,
    language: state.intl.locale,
    languages: state.config.AVAILABLE_LANGUAGES
  }
};



import * as enMsg from "../../i18n/l10n/en";
import * as svMsg from "../../i18n/l10n/sv";

const messages = {
    en: enMsg,
    sv: svMsg
};


const mapDispatchToProps = (dispatch, props) => {
  return {
      changeLanguage: function (e) {
          const lang = e.target.closest('.langselector').dataset.lang;
          const msgs = messages[lang];
          dispatch(updateIntl({
              locale: lang,
              messages : msgs
          }));
      }
  }
};

const FooterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);

export default i18n(FooterContainer);
