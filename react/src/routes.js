
/* 
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */


import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';
const history = createHistory();

import PersonalData from 'containers/PersonalData';
import Emails from 'containers/Emails';
import Mobile from 'containers/Mobile';
import Security from 'containers/Security';


// configure available routes in conjunction with configuredReactPanels  in
// init-app.js
class App extends Component {
  render() {
    return (
    <Router history={history}>
      <div>
           <Route path="/" component={PersonalData} />
           <Route path="/personaldata" component={PersonalData} />
           <Route path="/emails"       component={Emails} />
           <Route path="/phones"        component={Mobile} />
           <Route path="/security"      component={Security} />
      </div>
    </Router>
  )}
}

export default App;
