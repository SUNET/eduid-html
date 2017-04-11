
/* 
 * This is meant to be imported in the different entry points
 * to initialize the different components that the entry points
 * may want to render in different parts of the app.
 * Initialization involves localizing the app and providing
 * it with the redux store.
 */


import React from 'react';
import Router, { DefaultRoute, Route } from 'react-router';

import PersonalData from 'components/PersonalData';
import Emails from 'components/Emails';


var routes = (  
    <Route name="profile" path="/" handler={PersonalData}>
           <DefaultRoute handler={PersonalData} />
           <Route name="emails" handler={Emails} />
    </Route>
)
