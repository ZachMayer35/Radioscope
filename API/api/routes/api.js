'use strict';

import util from './util';

import Fibonacci from '../fibonacci';
import StringsArrays from '../stringsArrays';
import Moderate from '../moderate';
import Hard from '../hard';
import Run from '../run';

var _ROUTES_ = util.RouteBuilder('/api', Fibonacci, StringsArrays, Moderate, Hard, Run);

module.exports = _ROUTES_;
