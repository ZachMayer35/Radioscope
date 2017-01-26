'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './app/store';

import FibonacciPage from './pages/fibonacciPage';
import StringsPage from './pages/stringsPage';
import MiscPage from './pages/miscPage';
import SWAPIPage from './pages/swapi';
import MasterPage from './pages/masterPage';
import path from 'path';

global.API_PATH = global.API_PATH || path.join(__dirname, '/../api');

import './assets/main.less';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>    
        <Router history={history}>
        <Route path='/' component={MasterPage}>
            <IndexRoute component={FibonacciPage}/>
            <Route path='Home' component={FibonacciPage}/>
            <Route path='Strings' component={StringsPage}/>
            <Route path='Misc' component={MiscPage}/>
            <Route path='swapi' component={SWAPIPage}/>
        </Route>
        </Router>
    </Provider>,
    document.getElementById('appContainer')
);
