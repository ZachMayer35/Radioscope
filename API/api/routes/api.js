'use strict'

import util from './util';

import Fibonacci from '../fibonacci';
import StringsArrays from '../stringsArrays';
import Moderate from '../moderate';
import Hard from '../hard';

var _ROUTES_ = util.RouteBuilder('/api', Fibonacci, StringsArrays, Moderate, Hard);

module.exports = _ROUTES_;