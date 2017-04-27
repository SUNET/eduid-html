
/* 
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */


import React, { Component } from 'react';
import { BrowserRouter, Route, IndexRoute } from 'react-router-dom';

import App from 'components/App';

import PersonalData from 'containers/PersonalData';
import Emails from 'containers/Emails';
import Mobile from 'containers/Mobile';
import Security from 'containers/Security';


// configure available routes in conjunction with configuredReactPanels in
// init-app.js
class Routing extends Component {
  render() {
    return (
    <BrowserRouter>
      <div>
        <Route path="/" component={App}>
          <IndexRoute component={PersonalData} />
          <div>
          <Route path="/personaldata" component={PersonalData} />
          <Route path="emails"       component={Emails} />
          <Route path="#phones"        component={Mobile} />
          <Route path="/#security"      component={Security} />
          </div>
        </Route>
      </div>
    </BrowserRouter>
  )}
}

export default Routing;
