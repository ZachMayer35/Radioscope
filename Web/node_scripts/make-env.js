'use strict';

require('dotenv').config({ silent: true });
var path = require('path');
var FileWriter = require('./tools/file-writer');
var ip = require('quick-local-ip');

var HOST = process.env.NODE_ENV === 'development' ? 'localhost' : ip.getLocalIP4();
var PORT = process.env.NODE_ENV === 'development' ? '8080' : '80';

var env = [
    '###',
    '### WARNING: This file is generated by ' + path.basename(__filename) + ' - do not edit manually!',
    '###',
    'HOST=' + HOST,    
    'PORT=' + PORT,
    'API_ROOT=api',
    'API_HOST=' + HOST,
    'API_PORT=8085'
];


module.exports = function () {
    FileWriter.write('.env', env.join('\n'));
};