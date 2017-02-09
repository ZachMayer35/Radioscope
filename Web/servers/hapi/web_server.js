'use strict';

// Perform babel transforms defined in .babelrc (ES6, JSX, etc.) on server-side code
// Note: the options in .babelrc are also used for client-side code
// because we use a babel loader in webpack config

import babelRegister from 'babel-register';

import config from '../../variables';
import path from 'path';
import Hapi from 'hapi';
import Inert from 'inert';
import Vision from 'vision';
import HapiReactViews from 'hapi-react-views';
import H2o2 from 'h2o2';
import chalk from 'chalk';
import fetch from 'isomorphic-fetch';

var server = new Hapi.Server({
    connections: {
        router: {
            isCaseSensitive: false,
            stripTrailingSlash: true
        }
    }
});

server.connection({
    host: config.server.host,
    port: config.server.port
});

var plugins = [
    {register: Inert}, // enables serving static files (file and directory handlers)
    {register: Vision}, // enables rendering views with custom engines (view handler)
];
// Enable proxying requests to webpack dev server (proxy handler)
plugins.push({register: H2o2});




server.register(plugins, (err) => {

    if (err) {
        console.error(err);
        return;
    }

    // Set up server side react views using Vision
    server.views({
        engines: {jsx: HapiReactViews},
        path: config.paths.serverViews
    });

    // Serve all files from the assets directory
    // Note: in production this also serves webpack bundles
    server.route({
        method: 'GET',
        path: config.publicPaths.assets + '{path*}',
        handler: {
            directory: {
                path: config.paths.assets,
                index: false,
                listing: true,
                showHidden: false
            }
        }
    });

    // Serve white-listed files from the webRoot directory
    config.server.publicFiles.forEach(
        (filename) => {
            server.route({
                method: 'GET',
                path: '/' + filename,
                handler: {
                    file: {
                        path: path.join(config.paths.webRoot, filename)
                    }
                }
            });
        }
    );

    // Catch-all. Required for Deep Linking to the SPA.
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
            view: 'app'
            //reply('Hapi catch-all view for /' + request.params.path);
        }
    });

    // App
    server.route({
        method: 'GET',
        path: '/',
        handler: {
            view: 'app' // app.jsx in /server-views
        }
    });


    // DEV SETUP
    if (process.env.NODE_ENV === 'development') {
        // Proxy webpack assets requests to webpack-dev-server
        // Note: in development webpack bundles are served from memory, not filesystem
        server.route({
            method: 'GET',
            path: config.publicPaths.build + '{path*}', // this includes HMR patches, not just webpack bundle files
            handler: {
                proxy: {
                    host: config.server.host,
                    port: config.webpack.port,
                    passThrough: true
                }
            }
        });
    }

    const proxyConfig = {
        protocol: config.server.protocol,
        host: config.server.api_host,
        port: config.server.api_port,
        passThrough: true
    };
    const proxyHandler = function (request, reply) {
        if (config.env.CLOUDAMQP_URL || config.env.AMQP) { // MQ_RPC
            const queueName = request.headers.queuename.toLowerCase();
            const message = request.params;                
            if (!queueName) {
                throw new Error('In RPC Mode, Fetch calls require a queuename header');
            }
            const amqp = require('amqplib');
            const url = process.env.CLOUDAMQP_URL || 'amqp://localhost'; // Heroku supplied AMQP url or localhost.

            const generateUuid = function () {
                return Math.random().toString() +
                        Math.random().toString() +
                        Math.random().toString();
            };

            amqp.connect(url).then((conn) => {
                return conn.createChannel().then((ch) => {
                    return new Promise((resolve) => {
                        const corrId = generateUuid();
                        const maybeAnswer = function (msg) {
                            if (msg.properties.correlationId === corrId) {
                                resolve(msg.content);
                            }
                        }

                        let ok = ch.assertQueue('', { exclusive: true })
                            .then((qok) => (qok.queue));

                        ok = ok.then((queue) => {
                            return ch.consume(queue, maybeAnswer, { noAck: true })
                                .then(() => (queue));
                        });

                        ok = ok.then((queue) => {
                            console.log(` [x] Requesting ${queueName} message: ${JSON.stringify(message)}`);
                            ch.sendToQueue(queueName, new Buffer(JSON.stringify(message)), {
                                correlationId: corrId, replyTo: queue
                            });
                        });
                    });
                }).then((_reply) => {                        
                    console.log(` [.] Got ${queueName} message: ${_reply}`);
                    reply(_reply);
                }).finally(() => { 
                    conn.close(); 
                });
            }).catch(console.warn);
        } else { // WEB API
            return reply.proxy(proxyConfig);
        }
    };

    // Route requests to /API to the API server.    
    server.route({
        method: 'GET',
        path: config.publicPaths.api_root,
        handler: proxyHandler
    });
    server.route({
        method: 'GET',
        path: config.publicPaths.api + '{path*}',
        handler: proxyHandler
    });
    // Route requests to /documentation to the API server.
    server.route({
        method: 'GET',
        path: config.publicPaths.docs + '{path*}',
        handler: proxyHandler
    });
    // Route requests to /swaggerui to the API server which hosts swagger docs.
    server.route({
        method: 'GET',
        path: config.publicPaths.swagger + '{path*}',
        handler: proxyHandler
    });
    server.route({
        method: 'GET',
        path: '/swagger.json',
        handler: proxyHandler
    });

    server.route({
        method: 'GET',
        path: '/sw/' + '{path*}',
        handler: (request, reply) => {
            fetch(`https://swapi.co/${request.params.path}?format=json`)
                .then((response) => response.json())
                .then((response) => reply(response));
        }
    })

    server.start(() => {        
        console.log(chalk.green.bold('Web server started!'));
        console.log('Listening at ' + 
            chalk.bgGreen.bold(config.server.rootUrl));
        console.log('Routing /api to ' +
            chalk.bgBlue.bold(config.server.protocol + '://' + config.server.api_host + ':' + config.server.api_port));
    });
});