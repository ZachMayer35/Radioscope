'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


import store from './app/store';

import AuthPage from './pages/authPage';
import AuthSilent from './pages/authSilent';
import FibonacciPage from './pages/fibonacciPage';
import StringsPage from './pages/stringsPage';
import MiscPage from './pages/miscPage';
import SWAPIPage from './pages/swapi';
import MonacoPage from './pages/monaco';
import MasterPage from './pages/masterPage';
import path from 'path';

global.API_PATH = global.API_PATH || path.join(__dirname, '/../api');

import './assets/main.less';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
        <Route path='auth' component={AuthPage} />
        <Route path='authSilent' component={AuthSilent} />
        <Route path='/' component={MasterPage} >
            <IndexRoute component={FibonacciPage}/>
            <Route path='Home' component={FibonacciPage}/>
            <Route path='Strings' component={StringsPage}/>
            <Route path='Misc' component={MiscPage}/>
            <Route path='swapi' component={SWAPIPage}/>
            <Route path='monaco' component={MonacoPage}/>
            <Route path='swapi/:personId' component={SWAPIPage} />
        </Route>
        </Router>
    </Provider>,
    document.getElementById('appContainer')
);
