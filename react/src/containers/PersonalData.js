
import { connect } from 'react-redux';
import * as actions from "actions/PersonalDataActions";
import PersonalData from 'components/PersonalData';


const mapStateToProps = (state, props) => {
  return {
    given_name: state.personal_data.given_name,
    surname: state.personal_data.surname,
    display_name: state.personal_data.display_name,
    language: state.personal_data.language,
    langs: state.config.available_languages
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSave: (display_name) => {
      console.log('Saving eduID', props.display_name);
    }
  }
};

const PersonalDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalData)

export default PersonalDataContainer;
