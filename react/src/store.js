
import { combineReducers } from 'redux';
import personalDataReducer from 'reducers/PersonalDataReducer';

const eduIDApp = combineReducers({
  personal_data: personalDataReducer
});

export default eduIDApp;
