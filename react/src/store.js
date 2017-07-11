
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

const eduIDApp = combineReducers({
  config: configReducer,
  personal_data: personalDataReducer,
  emails: emailsReducer,
  openid_data: openidConnectReducer,
  phones: mobileReducer,
  security: securityReducer,
  chpass: chpassReducer,
  openid_freja_data: openidConnectFrejaReducer,
  phones: mobileReducer,
  nins: ninsReducer,
  letter_proofing: letterProofingReducer
});

export default eduIDApp;
