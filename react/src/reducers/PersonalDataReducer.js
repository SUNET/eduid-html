
import Immutable from "immutable";
import * as actions from "actions/PersonalDataActions";


const personalData = Immutable.Map({
    given_name: '',
    surname: '',
    display_name: '',
    language: 'sv'
});


let personalDataReducer = (state=personalData, action) => {
  switch (action.type) {
    case actions.SAVE_USERDATA:
      return Immutable.Map(action.data);
    default:
      return state;
  }
};

export default personalDataReducer;
