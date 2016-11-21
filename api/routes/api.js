'use strict'

var util = require('./util');

var Fibonacci = require(API_PATH + '/fibonacci');

var _ROUTES_ = util.RouteBuilder("/api", Fibonacci);

module.exports = _ROUTES_;