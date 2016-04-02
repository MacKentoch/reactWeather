'use strict';

import React        from 'react';
import {
  Router,
  Route,
  IndexRoute,
  // browserHistory,
  hashHistory
}                   from 'react-router';
import App          from '../containers/app/App.jsx';
import Home         from '../views/home/Home.jsx';
import About        from '../views/about/About.jsx';

export const Routes = () => {
  return (
    <Router   history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
      </Route>
    </Router>
  );
};
