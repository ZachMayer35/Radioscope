'use strict';

import util from './util';

import Fibonacci from '../fibonacci';
import StringsArrays from '../stringsArrays';
import Moderate from '../moderate';
import Hard from '../hard';
import Run from '../run';
import User from '../user';

var _ROUTES_ = util.RouteBuilder('/api', Fibonacci, StringsArrays, Moderate, Hard, Run, User);

module.exports = _ROUTES_;
