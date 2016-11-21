'use strict';

var path = require('path');
var chalk = require('chalk');

// This and anything in config.paths must be absolute.
var ROOT_PATH = global.ROOT_PATH = path.resolve(__dirname);

global.API_PATH = global.API_PATH || __dirname + '/api';

var WEB_CLIENT_DIRNAME = 'web/client';
var WEB_SERVER_DIRNAME = 'web/server';
var WEB_ROOT_DIRNAME = 'public';
var ASSETS_DIRNAME = 'static';
var BUILD_DIRNAME = 'static/build';
var API_PATH = 'api';
var DOC_PATH = 'documentation';

var SERVER_HOST;
var SERVER_PORT;
var SERVER_PROTOCOL = 'http'; // Note: I did not test https yet, so you might need more adjustments to make it work
var WEBPACK_DEV_SERVER_PORT = 3000;

// process.env object contains environment variables passed to the node.js process.
// For example, you can see NODE_ENV passed to node in the "scripts" section of package.json
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    SERVER_HOST = 'localhost';
    SERVER_PORT = process.env.PORT || 8080;
} else {
    var errorText = '[' + path.basename(__filename) + '] ERROR: NODE_ENV is not set: ' + process.env.NODE_ENV;
    console.log(chalk.red(errorText));
    throw new Error(errorText);
}

var config = {
    publicPaths: {
        assets: '/' + ASSETS_DIRNAME + '/',
        build: '/' + BUILD_DIRNAME + '/',
        api: '/' + API_PATH + '/',
        docs: '/' + DOC_PATH + '/'
    },
    paths: {
        root: ROOT_PATH,
        webRoot: path.join(ROOT_PATH, WEB_ROOT_DIRNAME),
        assets: path.join(ROOT_PATH, WEB_ROOT_DIRNAME, ASSETS_DIRNAME),
        build: path.join(ROOT_PATH, WEB_ROOT_DIRNAME, BUILD_DIRNAME), // Do not keep any non-generated files here.
        source: path.join(ROOT_PATH, WEB_CLIENT_DIRNAME),
        components: path.join(ROOT_PATH, WEB_CLIENT_DIRNAME, 'components'),
        serverViews: path.join(ROOT_PATH, WEB_SERVER_DIRNAME, 'views'),
        api: path.join(ROOT_PATH, API_PATH),
        docs: path.join(ROOT_PATH, DOC_PATH)
    },
    server: {
        publicFiles: [
            'robots.txt',
            'favicon.ico'
        ],
        host: SERVER_HOST,
        api_host: SERVER_HOST,
        port: SERVER_PORT,
        api_port: SERVER_PORT + 5,
        protocol: SERVER_PROTOCOL,
        rootUrl: SERVER_PROTOCOL + '://' + SERVER_HOST + ':' + SERVER_PORT
    },
    webpack: {
        // Webpack bundle filename
        outputFilename: '[name]-bundle-[hash].js',
        // Assets-webpack-plugin generates a JSON file containing actual
        // webpack bundle filenames on every webpack emit event.
        // To get the actual bundle filenames, use config/webpack-assets.js
        assetsFilename: 'webpack-assets.json',
        assetsPath: ROOT_PATH
    },
    vision: {
        viewsPath: 'views'
    }
};


if (process.env.NODE_ENV === 'development') {
    Object.assign(config.webpack, {
        port: WEBPACK_DEV_SERVER_PORT,
        devServerUrl: SERVER_PROTOCOL + '://' + SERVER_HOST + ':' + WEBPACK_DEV_SERVER_PORT
    });
}


Object.freeze(config); 

module.exports = config;