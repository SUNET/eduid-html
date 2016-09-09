
import { combineReducers } from 'redux';
import personalDataReducer from 'reducers/PersonalData';
import configReducer from 'reducers/Config';
import openidConnectReducer from 'reducers/OpenidConnect';

const eduIDApp = combineReducers({
  config: configReducer,
  personal_data: personalDataReducer,
  openid_data: openidConnectReducer
});

export default eduIDApp;
