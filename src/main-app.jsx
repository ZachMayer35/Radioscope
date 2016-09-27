'use strict';

var React = require('react'); // React must be in scope when using JSX because JSX is translated into React.createElement(...)
var ReactDOM = require('react-dom');
var Counter = require('./components/counter');
var Fibonacci = require('./components/fibonacci');
var path = require('path');

global.API_PATH = global.API_PATH || path.join(__dirname, '/../api');

require('./assets/main.scss');

function mainApp () {
    ReactDOM.render(
        <div id='we'><Counter /><Fibonacci /></div>,
        document.getElementById('appContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainApp);
