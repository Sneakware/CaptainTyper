'use strict';

require('../styles/app.scss');

import React from 'react';
import Router from 'react-router';
import { Route, NotFoundRoute, HistoryLocation } from 'react-router';

import Layout from './Layout';
import Home from './Home';
import Game from './Game';

var routes = (
  <Route path="/" handler={Layout}>
    <Route path="game" handler={Game}/>
    <NotFoundRoute handler={Home} />
  </Route>
);

Router.run(routes, HistoryLocation, (Root) => {
  React.render(<Root />, document.getElementById('render'));
});
