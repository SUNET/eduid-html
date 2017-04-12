
/* 
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */


import React from 'react';
import Router, { DefaultRoute, Route } from 'react-router';

import App from 'components/App';
import PersonalData from 'components/PersonalData';
import Emails from 'components/Emails';
import Mobile from 'components/Mobile';
import Security from 'components/Security';


// configure available routes in conjunction with configuredReactPanels  in
// init-app.js
var routes = (  
    <Route name="profile" path="/" handler={App}>
           <DefaultRoute handler={PersonalData} />
           <Route name="personaldata" handler={PersonalData} />
           <Route name="#emails" handler={Emails} />
           <Route name="phones" handler={Mobile} />
           <Route name="security" handler={Security} />
    </Route>
)

export default routes;
