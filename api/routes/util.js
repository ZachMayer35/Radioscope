'use strict'

import path from 'path'
import chalk from 'chalk'

var logPrefix = '[' + path.basename(__filename) + '] ';

var routeBuilder = function(){
    var objects = arguments;
    var prefix = null;
    if(typeof objects[0] === 'string'){
        prefix = objects[0];
        Array.prototype.shift.call(objects);
    } else {
        chalk.red(logPrefix + 'ERROR: Missing Parameter. First Argument to routeBuilder must be a string path prefix.');
        return false;
    }
    var routes = [];
    Array.prototype.forEach.call(objects, function(obj){
        if(obj.routes && Array.isArray(obj.routes)){
            obj.routes.forEach(function(route, i, objRoutes){
                var _route = objRoutes.slice(i, i+1)[0];
                _route.path = prefix + _route.path;
                routes.push(_route);
            });
        }
    }); 
    return routes; 
}

module.exports = { RouteBuilder: routeBuilder };