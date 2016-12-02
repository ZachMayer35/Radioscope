'use strict';

import React from 'react'; // React must be in scope when using JSX because JSX is translated into React.createElement(...)
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './app/store';

import Fibonacci from './fibonacci/';
import path from 'path';

global.API_PATH = global.API_PATH || path.join(__dirname, '/../api');

import './assets/main.less';

function mainApp () {
    ReactDOM.render(
        <Provider store={store}>
            <Fibonacci n={10}/>
        </Provider>,
        document.getElementById('appContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainApp);
