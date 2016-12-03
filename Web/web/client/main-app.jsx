'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './app/store';

import FibonacciPage from './pages/fibonacciPage';
import FooPage from './pages/fooPage';
import BarPage from './pages/barPage';
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
            <Route path='foo' component={FooPage}/>
            <Route path='bar' component={BarPage}/>
        </Route>
        </Router>
    </Provider>,
    document.getElementById('appContainer')
);
