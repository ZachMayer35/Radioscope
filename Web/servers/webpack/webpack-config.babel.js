'use strict';

import path from 'path';
import webpack from 'webpack';
import AssetsWebpackPlugin from 'assets-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import config from '../../variables';



var APP_ENTRY = path.join(config.paths.source, 'main-app');
var WEBPACK_HOT_ENTRY = 'webpack-hot-middleware/client?path=' + config.webpack.devServerUrl + '/__webpack_hmr';
var JS_JSX = /\.(js|jsx)$/;
var BABEL = 'babel'; // We use Babel to transpile ES6/JSX into ES5. See .babelrc for additional rules.
var CSS_LOADER = {
    test: /\.css$/,
    loaders: ['style', 'css'], // Loaders are processed last-to-first
    include: config.paths.source
};
var SASS_LOADER = {
    test: /\.scss$/,
    loaders: ["style", "css", "sass"],
    include: config.paths.source
}
var LESS_LOADER = {
    test: /\.less$/,
    loaders: ["style", "css", "less"],
    include: config.paths.source
}
var URL_LOADER = {
    test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
    loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
}

var webpackConfig = {
    resolveLoader: { root: path.join(__dirname, '../../node_modules') },
    resolve: {
        // Webpack tries to append these extensions when you require(moduleName)
        // The empty extension allows specifying the extension in a require call, e.g. require('./main-app.css')
        extensions: ['', '.js', '.jsx']
    },
    output: {
        publicPath: config.publicPaths.build, // Expose bundles in this web directory (Note: only dev server uses this option)
        filename: config.webpack.outputFilename, // Bundle filename pattern
        path: config.paths.build  // Put bundle files in this directory (Note: dev server does not generate bundle files)
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        //new SlowWebpackPlugin({delay: 2000}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),                
                AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
                AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
                AUTH0_CALLBACK_URL: JSON.stringify(process.env.AUTH0_CALLBACK_URL),
            }
        }),
        new AssetsWebpackPlugin({
            filename: config.webpack.assetsFilename,
            path: config.webpack.assetsPath,
            prettyPrint: false
        }),
        new CopyWebpackPlugin([
            {
                from: 'node_modules/monaco-editor/min/vs',
                to: 'vs',
            }
        ])
    ]
};



if (process.env.NODE_ENV === 'development') {

    Object.assign(webpackConfig, {
        entry: {
            app: [APP_ENTRY, WEBPACK_HOT_ENTRY]
        },
        devtool: 'cheap-inline-source-map', // Generate source maps (more or less efficiently)
        module: {
            preLoaders: [
                {
                    test: JS_JSX,
                    loader: 'eslint-loader', // Lint all JS files before compiling the bundles (see .eslintrc for rules)
                    include: config.paths.source
                }
            ],
            loaders: [
                URL_LOADER,
                CSS_LOADER,
                SASS_LOADER,
                LESS_LOADER,
                {
                    test: JS_JSX,
                    loader: BABEL,
                    include: config.paths.source,
                    query: {
                        plugins: [
                            ['react-transform', {
                                transforms: [{
                                    transform: 'react-transform-hmr',
                                    imports: ['react'],
                                    locals: ['module']
                                }]
                            }]
                        ]
                    }
                }
            ]
        },
        eslint: {
            //failOnWarning: true,
            failOnError: true
        }
    });

    Array.prototype.push.apply(webpackConfig.plugins, [
        new webpack.HotModuleReplacementPlugin(), // Enables HMR. Adds webpack/hot/dev-server entry point if hot=true
        new webpack.NoErrorsPlugin() // @TODO do we really want / need this? On dev or on production too?
    ]);


} else { // production

    /** @lends webpackConfig */
    Object.assign(webpackConfig, {
        entry: {
            app: APP_ENTRY
        },
        devtool: 'cheap-module-source-map', // fast generation.
        module: {
            loaders: [
                URL_LOADER,
                CSS_LOADER,
                SASS_LOADER,
                LESS_LOADER,
                {
                    test: JS_JSX,
                    loader: BABEL,
                    include: config.paths.source
                }
            ]
        }
    });

    Array.prototype.push.apply(webpackConfig.plugins, [
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false // Don't complain about things like removing unreachable code
            }
        })
    ]);
}


module.exports = webpackConfig;