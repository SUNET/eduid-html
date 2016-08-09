
import * as actions from "actions/PersonalDataActions";


const personalData = {
    given_name: '',
    surname: '',
    display_name: '',
    language: 'sv'
};


let personalDataReducer = (state=personalData, action) => {
  switch (action.type) {
    case actions.SAVE_USERDATA:
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default personalDataReducer;
