
import { combineReducers } from 'redux';
import personalDataReducer from 'reducers/PersonalData';
import configReducer from 'reducers/Config';

const eduIDApp = combineReducers({
  config: configReducer,
  personal_data: personalDataReducer
});

export default eduIDApp;
