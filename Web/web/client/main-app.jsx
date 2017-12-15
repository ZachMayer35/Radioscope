'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './app/store';
import * as userActions from './app/actions/user-actions';

import AuthPage from './pages/authPage';
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

if (localStorage.getItem('access_token') && 
    localStorage.getItem('id_token') && 
    localStorage.getItem('expires_at')) {
    store.dispatch(userActions.login({
        accessToken: localStorage.getItem('access_token'),
        idToken: localStorage.getItem('id_token'),
        expiresAt: localStorage.getItem('expires_at')
    }));
}

ReactDOM.render(
    <Provider store={store}>    
        <Router history={history}>
        <Route path='/' component={MasterPage}>
            <IndexRoute component={FibonacciPage}/>
            <Route path='auth' component={AuthPage} />
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
