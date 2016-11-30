'use strict';

import path from 'path';
import FileWriter from './tools/file-writer';
import config from '../variables';

var nodemonConfig = {
    '////': '//',
    '///': 'WARNING: This file is generated by ' + path.basename(__filename) + ' - do not edit manually!',
    '//': '////',
    verbose: true,
    ext: 'js',
    env: {
        NODE_ENV: process.env.NODE_ENV
    },
    delay: 200, // Debounce nodemon restarts. Note: nodemon restarting too often can screw with HMR.
    ignore: [
        '.idea',
        '.sass-cache',        
        path.relative(config.paths.root, config.paths.test) + '/*' // ignore changes to tests; those are picked up by JEST.
    ]
};


module.exports = function () {
    FileWriter.write('nodemon.json', JSON.stringify(nodemonConfig, null, 2));
};