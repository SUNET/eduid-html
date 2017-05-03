import React, { Component } from 'react';

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




class App extends Component {

  render () {
      if (this.props.location.hash !== undefined) {
          const url = this.props.location.hash.substring(1),
                component = components[url];
          return (<component />);
      }

      return (<PersonalDataContainer />);
  }
}

export default App;
