'use strict';

import './clean';

import env from './make-env';
import eslintignore from './make-eslintignore';
import nodemonJson from './make-nodemon-json';

env();
eslintignore();
nodemonJson();