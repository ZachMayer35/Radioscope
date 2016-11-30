'use strict';

require('dotenv').config({ silent:true });

var path = require('path');
var chalk = require('chalk');

// This and anything in config.paths must be absolute.
var ROOT_PATH = global.ROOT_PATH = path.resolve(__dirname);

global.API_PATH = global.API_PATH || __dirname + '/api';

var API_PATH = 'api';
var DOC_PATH = 'documentation';
var SWAGGER_PATH = 'swaggerui';

var SERVER_HOST = process.env.HOST || '127.0.0.1';
var SERVER_PORT = process.env.PORT || 8085;
var SERVER_PROTOCOL = process.env.PROTOCOL || 'http';

if (process.env.NODE_ENV != 'development' && process.env.NODE_ENV != 'production') {    
    var errorText = '[' + path.basename(__filename) + '] ERROR: NODE_ENV is not set: ' + process.env.NODE_ENV;
    console.log(chalk.red(errorText));
    throw new Error(errorText);
}

var config = {
    publicPaths: {
        api: '/' + API_PATH + '/',
        api_root: '/' + API_PATH,
        docs: '/' + DOC_PATH + '/',
        swagger: '/' + SWAGGER_PATH + '/',
    },
    paths: {
        root: ROOT_PATH,
        test: path.join(ROOT_PATH, 'tests')
    },
    server: {
        publicFiles: [
            'robots.txt',
            'favicon.ico'
        ],
        host: SERVER_HOST,
        api_host: SERVER_HOST,
        port: SERVER_PORT,
        api_port: SERVER_PORT,
        protocol: SERVER_PROTOCOL,
        rootUrl: SERVER_PROTOCOL + '://' + SERVER_HOST + ':' + SERVER_PORT
    }
};

Object.freeze(config); 

module.exports = config;