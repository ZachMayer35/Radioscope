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
                </head>
                <body>                
                    <div id='appContainer' className="flex-container">This text will be replaced by an app component</div>
                </body>
                <script async src={getWebpackAssets().app.js}></script>
            </html>
        );
    }
});

module.exports = App;