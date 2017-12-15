'use strict';

// Perform babel transforms defined in .babelrc (ES6, JSX, etc.) on server-side code
// Note: the options in .babelrc are also used for client-side code
// because we use a babel loader in webpack config
import babelRegister from 'babel-register';

import config from '../../variables';
import chalk from 'chalk';
import path from 'path';
import Hapi from 'hapi';
import routes from '../../api/routes';
import Pack from '../../package';
import HapiSwagger from 'hapi-swagger';
import Inert from 'inert';
import Vision from 'vision';
import axios from 'axios';
import { route_config } from '../../config';
import jwt from 'hapi-auth-jwt2';
import jwksRsa  from 'jwks-rsa';

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
    { register: HapiSwagger, options: swagger_options }, // enables swagger API documentation
    { register: jwt }
];

var validate = function (decoded, request, callback) {
    // do your checks to see if the token is valid 
    if (!decoded.sub || !decoded.sub.split('|')[1]) {
        console.log(chalk.red('Unauthorized User'));
        return callback(null, false);
    }
    else {
        console.log(chalk.green(`Authorized User ID: ${decoded.sub.split('|')[1]}`))
        return callback(null, true);
    }
};

server.register(plugins, (err) => {

    if (err) {
        console.error(err);
        return;
    }
    server.auth.strategy('jwt', 'jwt', 'required', {
        complete: true,
        // verify the access token against the
        // remote Auth0 JWKS 
        key: jwksRsa.hapiJwt2Key({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `https://generictest35.auth0.com/.well-known/jwks.json`
        }),
        verifyOptions: {
          audience: 'mufc9w7SiOb3A5SbxEAQgGJtwJgwsya9',
          issuer: `https://generictest35.auth0.com/`,
          algorithms: ['RS256']
        },
        validateFunc: validate
      });

    // Default Route. Redirects to /documentation
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            server.inject('/documentation', (res) => {
                reply(res.payload);
            });
        },
        config: route_config
    });
    // Default /API Route. Redirects to /documentation
    server.route({
        method: 'GET',
        path: config.publicPaths.api_root,
        handler: (request, reply) => {
            server.inject('/documentation', (res) => {
                reply(res.payload);
            });
        },
        config: route_config
    });
    server.route(routes.map((route) => ({...route, config: {...route_config, ...route.config}})));

    server.start(() => {
        console.log(chalk.green.bold('API and Documentation server started!'));
        console.log('Listening at ' + 
            chalk.bgGreen.bold(config.server.rootUrl));
    });
});

export default server;
