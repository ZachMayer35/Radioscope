'use strict';

import path from 'path';
import chalk from 'chalk';
import Joi from 'joi';
import vm from 'vm';

var logPrefix = '[' + path.basename(__filename) + ']';

var Run = {
    'js' : (codeStr) => { // Run a JS string as code in a VM context.
        console.log(chalk.green(`${logPrefix} Ran JS code (${codeStr})`));
        const output = [];
        const newConsole = {
            log: (msg) => {
                output.push(msg);
                console.log(msg);
            }
        }     
        try {
            vm.runInNewContext(codeStr, {
                require: require,
                console: newConsole
            });
        } catch (ex) {
            console.log(chalk.red(ex));
            newConsole.log(ex.name + ': ' + ex.message);
        }
        return output;
    }
};

Run.routes = [
    {
        method: 'GET', // TODO: Convert to POST. Gotta get the message queues to respect posts...
        path: '/run/js/{codeStr}',
        handler: (request, reply) => {
            var code = decodeURI(request.params.codeStr);
            reply(Run.js(code));
        },
        config: {     
            id: '/run/js/',
            // SWAGGER DOCS
            description: 'Run JS',
            notes: 'Run a JS string as code in a VM context.',
            tags: ['api', 'Run', 'JS', 'get'],
            // END SWAGGER DOCS
            validate: {
                params: {
                    codeStr: Joi.string().max(1000)
                }
            }
        }
    }
];

module.exports = Run;
