'use strict';

// Perform babel transforms defined in .babelrc (ES6, JSX, etc.) on server-side code
// Note: the options in .babelrc are also used for client-side code
// because we use a babel loader in webpack config
require('babel-register');

var config = require('./config/variables');
var path = require('path');
var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var HapiReactViews = require('hapi-react-views');

var routes = require('./config/routes');

var server = new Hapi.Server();

server.connection({
    host: config.server.host,
    port: config.server.port
});



var plugins = [
    {register: Inert}, // enables serving static files (file and directory handlers)
    {register: Vision} // enables rendering views with custom engines (view handler)
];
// Enable proxying requests to webpack dev server (proxy handler)
if (process.env.NODE_ENV === 'development') {
    var H2o2 = require('h2o2');
    plugins.push({register: H2o2});
}



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
                listing: false,
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

    // Catch-all
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: (request, reply) => {
            reply('Hapi catch-all view for /' + encodeURIComponent(request.params.path));
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

    server.route(routes);

    server.start(() => {
        console.log('Hapi server started!');
    });
});