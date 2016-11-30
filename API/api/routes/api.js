'use strict'

import util from './util';

import Fibonacci from '../fibonacci';
import StringsArrays from '../stringsArrays';
import Moderate from '../moderate';

var _ROUTES_ = util.RouteBuilder("/api", Fibonacci, StringsArrays, Moderate);

module.exports = _ROUTES_;