'use strict';

// Perform babel transforms defined in .babelrc (ES6, JSX, etc.) on server-side code
// Note: the options in .babelrc are also used for client-side code
// because we use a babel loader in webpack config
require('babel-register');

var config = require('../../variables');
var chalk = require('chalk');
var path = require('path');
var Hapi = require('hapi');
var routes = require('../../api/routes');
const Pack = require('../../package');
const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

var server = new Hapi.Server({
    connections: {
        router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
        }
    }
});

server.connection({
    host: config.server.api_host,
    port: config.server.api_port
});

var swagger_options = {
    info: {
        title: 'Radioscope API Documentation',
        version: Pack.version
    }
};

var plugins = [
    { register: Inert }, // enables serving static files (file and directory handlers). Required for Swagger
    { register: Vision }, // enables rendering views with custom engines (view handler). Required for Swagger
    { register: HapiSwagger, options: swagger_options } // enables swagger API documentation
];

server.register(plugins, (err) => {

    if (err) {
        console.error(err);
        return;
    }

    // Default Route. Redirects to /documentation
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            server.inject('/documentation', function (res) {
                reply(res.payload);
            });
        }
    });
    // Default /API Route. Redirects to /documentation
    server.route({
        method: 'GET',
        path: config.publicPaths.api_root,
        handler: (request, reply) => {
            server.inject('/documentation', function (res) {
                reply(res.payload);
            });
        }
    });

    server.route(routes);

    server.start(() => {
        console.log(chalk.green.bold('API and Documentation server started!'));
        console.log('Listening at ' + 
            chalk.bgGreen.bold(config.server.rootUrl));
    });
});