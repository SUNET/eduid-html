
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

import PersonalData from 'components/PersonalData';


// configure available routes in conjunction with configuredReactPanels in
// init-app.js
class Routing extends Component {
  render() {
    return (
    <BrowserRouter>
      <div>
        <Route path="/(:filter)" component={App} />
      </div>
    </BrowserRouter>
  )}
}

export default Routing;
