'use strict';

var path = require('path');
var FileWriter = require('./tools/file-writer');

var eslintIgnore = [
    '###',
    '### WARNING: This file is generated by ' + path.basename(__filename) + ' - do not edit manually!',
    '###',
    '',    
    ''
];


module.exports = function () {
    FileWriter.write('.eslintignore', eslintIgnore.join('\n'));
};