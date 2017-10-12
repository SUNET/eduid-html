
import { combineReducers } from 'redux';
import personalDataReducer from 'reducers/PersonalData';
import emailsReducer from 'reducers/Emails';
import configReducer from 'reducers/Config';
import openidConnectReducer from 'reducers/OpenidConnect';
import openidConnectFrejaReducer from 'reducers/OpenidConnectFreja';
import mobileReducer from 'reducers/Mobile';
import securityReducer from 'reducers/Security';
import chpassReducer from 'reducers/ChangePassword';
import ninsReducer from 'reducers/Nins';
import letterProofingReducer from 'reducers/LetterProofing';
import notificationsReducer from 'reducers/Notifications';
import profileReducer from 'reducers/Profile';
import { routerReducer } from 'react-router-redux'

const eduIDApp = combineReducers({
  router: routerReducer,
  chpass: chpassReducer,
  config: configReducer,
  emails: emailsReducer,
  openid_data: openidConnectReducer,
  openid_freja_data: openidConnectFrejaReducer,
  personal_data: personalDataReducer,
  phones: mobileReducer,
  nins: ninsReducer,
  letter_proofing: letterProofingReducer,
  notifications: notificationsReducer,
  security: securityReducer,
  profile: profileReducer
});

export default eduIDApp;
