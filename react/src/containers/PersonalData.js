
import { connect } from 'react-redux';
import PersonalData from 'components/PersonalData';
import { postUserdata, changeUserdata } from "actions/PersonalData";


const mapStateToProps = (state, props) => {
  return {
    given_name: state.personal_data.given_name,
    surname: state.personal_data.surname,
    display_name: state.personal_data.display_name,
    language: state.personal_data.language,
    langs: state.config.AVAILABLE_LANGUAGES,
    is_fetching: state.personal_data.is_fetching,
    errorMsg: state.personal_data.error
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSave: (e) => {
      dispatch(postUserdata());
    },
    handleChange: function (e) {
      let data = {};
      data[this.name] = e.target.value;
      dispatch(changeUserdata(data));
    }
  }

};

const PersonalDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalData);

export default PersonalDataContainer;
