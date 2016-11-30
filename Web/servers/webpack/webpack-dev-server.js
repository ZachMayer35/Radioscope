'use strict';

if (process.env.NODE_ENV !== 'development') {
    throw new Error('ERROR: Webpack dev server only works in dev environment');
}

import chalk from 'chalk';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../../variables';
import webpackConfig from './webpack-config.babel';


var app = express();
var compiler = webpack(webpackConfig);


app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: false,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler));

app.listen(config.webpack.port, config.server.host, (err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(chalk.green('Webpack dev server listening at ' + config.webpack.devServerUrl));
});