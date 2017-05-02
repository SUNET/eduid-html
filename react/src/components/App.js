import React from 'react';

import PersonalDataContainer from 'containers/PersonalData';
import EmailsContainer from 'containers/Emails';
import MobileContainer from 'containers/Mobile';
import SecurityContainer from 'containers/Security';


const components = {
  personaldata: PersonalDataContainer,
  emails: EmailsContainer,
  mobiles: MobileContainer,
  security: SecurityContainer
}


const App = ( { params } ) => {
  const url = params.filter,
        component = components[url];

  return (<component />);
};

export default App;
