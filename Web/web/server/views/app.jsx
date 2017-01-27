'use strict';

import getWebpackAssets from '../get-webpack-assets';
import React from 'react';
import GithubCorner from 'react-github-corner';

var App = React.createClass({
    render: function () {
        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <title>Radioscope</title>
                    <link rel='stylesheet' href='/assets/loader.css' />
                </head>
                <body>    
                <GithubCorner
                    href={'https://github.com/ZachMayer35/Radioscope'}
                    bannerColor="#337ab7"
                    octoColor="#fff"
                    width={80}
                    height={80}
                    direction="right"
                    />
                <div id='appContainer' className='flex-container container'>
                    <div style={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ resize: 'both' }} className='loader'>
                        </div>
                    </div>
                </div>                    
                </body>
                <script async src={getWebpackAssets().app.js}></script>
            </html>
        );
    }
});

module.exports = App;
