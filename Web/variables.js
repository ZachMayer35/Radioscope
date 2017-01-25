'use strict';

import path from 'path';
import chalk from 'chalk';
import dotenv from 'dotenv';
dotenv.config({ silent: true });

// This and anything in config.paths must be absolute.
var ROOT_PATH = global.ROOT_PATH = path.resolve(__dirname);

global.API_PATH = global.API_PATH || __dirname + '/api';

var WEB_CLIENT_DIRNAME = 'web/client';
var WEB_SERVER_DIRNAME = 'web/server';
var WEB_ROOT_DIRNAME = 'public';
var ASSETS_DIRNAME = 'static';
var BUILD_DIRNAME = 'static/build';
var API_PATH = process.env.API_ROOT || 'api';
var DOC_PATH = 'documentation';
var SWAGGER_PATH = 'swaggerui';

var SERVER_HOST = process.env.HOST || process.env.NODE_ENV === 'development' ? '127.0.0.1' : '0.0.0.0';
var SERVER_PORT = parseInt(process.env.PORT) || 8080;
var SERVER_PROTOCOL = process.env.PROTOCOL || 'https';
var WEBPACK_DEV_SERVER_PORT = 3000;

// process.env object contains environment variables passed to the node.js process.
// For example, you can see NODE_ENV passed to node in the "scripts" section of package.json
if (process.env.NODE_ENV != 'development' && process.env.NODE_ENV != 'production') {
    var errorText = '[' + path.basename(__filename) + '] ERROR: NODE_ENV is not set: ' + process.env.NODE_ENV;
    console.log(chalk.red(errorText));
    //throw new Error(errorText);
    process.env.NODE_ENV = 'production';
}

var config = {
    publicPaths: {
        assets: '/' + ASSETS_DIRNAME + '/',
        build: '/' + BUILD_DIRNAME + '/',
        api: '/' + API_PATH + '/',
        api_root: '/' + API_PATH,
        docs: '/' + DOC_PATH + '/',
        swagger: '/' + SWAGGER_PATH + '/',
    },
    paths: {
        root: ROOT_PATH,
        webRoot: path.join(ROOT_PATH, WEB_ROOT_DIRNAME),
        assets: path.join(ROOT_PATH, WEB_ROOT_DIRNAME, ASSETS_DIRNAME),
        build: path.join(ROOT_PATH, WEB_ROOT_DIRNAME, BUILD_DIRNAME), // Do not keep any non-generated files here.
        source: path.join(ROOT_PATH, WEB_CLIENT_DIRNAME),
        components: path.join(ROOT_PATH, WEB_CLIENT_DIRNAME),
        serverViews: path.join(ROOT_PATH, WEB_SERVER_DIRNAME, 'views'),
        test: path.join(ROOT_PATH, 'tests')
    },
    server: {
        publicFiles: [
            'robots.txt',
            'favicon.ico'
        ],
        host: SERVER_HOST,
        api_host: process.env.API_HOST || '0.0.0.0',
        port: SERVER_PORT,
        api_port: process.env.API_PORT || 29957,
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
        viewsPath: 'web/server/views'
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