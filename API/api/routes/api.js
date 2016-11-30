'use strict'
/* global API_PATH */

var util = require('./util');

var Fibonacci = require(API_PATH + '/fibonacci');
var StringsArrays = require(API_PATH + '/stringsArrays');
var Moderate = require(API_PATH + '/moderate');

var _ROUTES_ = util.RouteBuilder("/api", Fibonacci, StringsArrays, Moderate);

module.exports = _ROUTES_;