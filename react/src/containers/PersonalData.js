
import { connect } from 'react-redux';
import { touch } from 'redux-form';
import PersonalData from 'components/PersonalData';
import { postUserdata, changeUserdata } from "actions/PersonalData";
import i18n from 'i18n-messages';


const mapStateToProps = (state, props) => {
  let langs = [];
  if (state.config.AVAILABLE_LANGUAGES !== undefined) {
      langs = [ ...state.config.AVAILABLE_LANGUAGES ];
      langs.unshift(['', props.l10n('pd.choose-language')]);
  }
  let data_good = false;
  if (state.form.personal_data && state.form.personal_data.values &&
      state.form.personal_data.values.display_name && 
      state.form.personal_data.values.surname && 
      state.form.personal_data.values.given_name) {
      data_good = true;
  }
  return {
    data: state.personal_data.data,
    langs: langs,
    is_fetching: state.personal_data.is_fetching,
    no_lang_data_good: data_good
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSave: (e) => {
      e.preventDefault();
      dispatch(postUserdata());
    },
    handleHover: (no_lang_data_good) => {
      return function (e) {
        if (no_lang_data_good) {
          dispatch(touch('personal_data', ['language']));
        }
      };
    },
  }
};

const PersonalDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalData);

export default i18n(PersonalDataContainer);
