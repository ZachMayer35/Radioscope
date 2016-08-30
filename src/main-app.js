'use strict';

var React = require('react'); // React must be in scope when using JSX because JSX is translated into React.createElement(...)
var ReactDOM = require('react-dom');
var Counter = require('./components/counter');

require('./main-app.css');
require('./assets/HACK.css');

function mainApp () {
    ReactDOM.render(
        <div><h3>THINGER</h3><Counter /></div>,
        document.getElementById('appContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainApp);
