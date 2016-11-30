'use strict';

import React from 'react'; // React must be in scope when using JSX because JSX is translated into React.createElement(...)
import ReactDOM from 'react-dom';
import Fibonacci from './components/fibonacci';
import path from 'path';

global.API_PATH = global.API_PATH || path.join(__dirname, '/../api');

import css from './assets/main.less';

function mainApp () {
    ReactDOM.render(
        <div id='we'><Fibonacci initial_N={10}/></div>,
        document.getElementById('appContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainApp);
