'use strict'
/* global API_PATH */

var util = require('./util');

var Fibonacci = require(API_PATH + '/fibonacci');
var StringsArrays = require(API_PATH + '/stringsArrays');

var _ROUTES_ = util.RouteBuilder("/api", Fibonacci, StringsArrays);

module.exports = _ROUTES_;