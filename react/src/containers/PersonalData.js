
import { connect } from 'react-redux';
import PersonalData from 'components/PersonalData';


const mapStateToProps = (state, props) => {
  return {
    given_name: state.personal_data.given_name,
    surname: state.personal_data.surname,
    display_name: state.personal_data.display_name,
    language: state.personal_data.language,
    langs: []
  }
};


const mapDispatchToProps = (dispatch, props) => {
  return {
    handleSave: () => {
      console.log('Saving eduID', props.display_name)
    }
  }
};

const PersonalDataContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalData)

export default PersonalDataContainer;
