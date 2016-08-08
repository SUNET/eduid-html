
import { combineReducers } from 'redux';
import personalDataReducer from 'reducers/PersonalDataReducer';
import configReducer from 'reducers/ConfigReducer';

const eduIDApp = combineReducers({
  config: configReducer,
  personal_data: personalDataReducer
});

export default eduIDApp;
