'use strict';

import path from 'path';
import chalk from 'chalk';
import Joi from 'joi';

var logPrefix = '[' + path.basename(__filename) + '] ';

var Moderate = {
    '1' : (one, two) => { // Swap a number in place without temporary variables
        one = one - two;
        two = two + one;
        one = two - one;
        console.log(chalk.green(logPrefix + 'Swaped two numbers (' + one + ' and ' + two + ') in place'));
        return {
            one: one,
            two: two
        };
    }
};

Moderate.routes = [
    {
        method: 'GET',
        path: '/moderate/1/{num1}/{num2}',
        handler: (request, reply) => {
            var one = request.params.num1;
            var two = request.params.num2;
            reply(Moderate['1'](one, two));
        },
        config: {            
            // SWAGGER DOCS
            description: 'Moderate 1',
            notes: 'Swap a number in place without temporary variables',
            tags: ['api', 'Moderate', 'get'],
            // END SWAGGER DOCS
            validate: {
                params: {
                    num1: Joi.number().integer().min(-1000).max(1000),
                    num2: Joi.number().integer().min(-1000).max(1000)
                }
            }
        }
    }
];

module.exports = Moderate;
