'use strict';

var getWebpackAssets = require('../tools/get-webpack-assets');
var React = require('react');

var App = React.createClass({

    render: function () {
        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <title>Test Demo</title>
                    <script src={getWebpackAssets().app.js}></script>
                </head>
                <body>
                    <div id='appContainer'>This text will be replaced by Counter component</div>
                </body>
            </html>
        );
    }
});

module.exports = App;