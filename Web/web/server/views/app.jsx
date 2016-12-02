'use strict';

import getWebpackAssets from '../get-webpack-assets';
import React from 'react';

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
                    <div id='appContainer'>This text will be replaced by an app component</div>
                </body>
            </html>
        );
    }
});

module.exports = App;