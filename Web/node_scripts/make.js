'use strict';

require('./clean');

require('./make-env')();
require('./make-eslintignore')();
require('./make-nodemon-json')();