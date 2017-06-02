
import { combineReducers } from 'redux';
import personalDataReducer from 'reducers/PersonalData';
import emailsReducer from 'reducers/Emails';
import configReducer from 'reducers/Config';
import openidConnectReducer from 'reducers/OpenidConnect';
import openidConnectFrejaReducer from 'reducers/OpenidConnectFreja';
import mobileReducer from 'reducers/Mobile';

const eduIDApp = combineReducers({
  config: configReducer,
  personal_data: personalDataReducer,
  emails: emailsReducer,
  openid_data: openidConnectReducer,
  openid_freja_data: openidConnectFrejaReducer,
  phones: mobileReducer,
});

export default eduIDApp;
