'use strict';

var path = require('path');
var FileWriter = require('./tools/file-writer');
//var config = require('../variables');

FileWriter.remove('.env');
FileWriter.remove('.eslintignore');
FileWriter.remove('nodemon.json');