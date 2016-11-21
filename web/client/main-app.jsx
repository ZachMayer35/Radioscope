'use strict';

var React = require('react'); // React must be in scope when using JSX because JSX is translated into React.createElement(...)
var ReactDOM = require('react-dom');
var Fibonacci = require('./components/fibonacci');
var path = require('path');

global.API_PATH = global.API_PATH || path.join(__dirname, '/../api');

require('./assets/main.less');

function mainApp () {
    ReactDOM.render(
        <div id='we'><Fibonacci initial_N={10}/></div>,
        document.getElementById('appContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainApp);
