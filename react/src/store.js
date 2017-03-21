
import { combineReducers } from 'redux';
import personalDataReducer from 'reducers/PersonalData';
import emailsReducer from 'reducers/Emails';
import configReducer from 'reducers/Config';
import openidConnectReducer from 'reducers/OpenidConnect';
import mobileReducer from 'reducers/Mobile';
import ninsReducer from 'reducers/Nins';

const eduIDApp = combineReducers({
  config: configReducer,
  personal_data: personalDataReducer,
  emails: emailsReducer,
  openid_data: openidConnectReducer,
  phones: mobileReducer,
  nins: ninsReducer,
});

export default eduIDApp;
