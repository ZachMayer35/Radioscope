'use strict';

import path from 'path';
import chalk from 'chalk';

var logPrefix = '[' + path.basename(__filename) + '] ';

const routeBuilder = function () {
    var objects = arguments;
    var prefix = typeof objects[0] === 'string' ? objects[0] : '/api';
    if (typeof objects[0] === 'string') {
        Array.prototype.shift.call(objects);
    }
    var routes = [];
    Array.prototype.forEach.call(objects, (obj) => {
        if (obj.routes && Array.isArray(obj.routes)) {
            obj.routes.forEach((route, i, objRoutes) => {
                var _route = objRoutes.slice(i, i + 1)[0];
                _route.path = prefix + _route.path;
                routes.push(_route);
                console.log(chalk.green(`${logPrefix} Build Route for (${_route.path})`));
            });
        }
    });
    return routes;
};

module.exports = {RouteBuilder: routeBuilder};
