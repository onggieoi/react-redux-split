import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'src/containers/Home/Loadable';
import FeaturePage from 'src/containers/FeaturePage/Loadable';
import NotFoundPage from 'src/containers/NotFoundPage/Loadable';

import './App.css';

function App() {
  return (
    <>
      <Helmet
        titleTemplate="%s - React"
        defaultTitle="React"
      >
        <meta name="description" content="A React test application" />
      </Helmet>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={FeaturePage} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </>
  );
}

export default App;
