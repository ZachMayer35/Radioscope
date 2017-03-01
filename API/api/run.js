'use strict';

import path from 'path';
import chalk from 'chalk';
import Joi from 'joi';
import vm from 'vm';
import atob from 'atob';
import btoa from 'btoa';
import stream from 'stream';
import util from 'util';

var logPrefix = '[' + path.basename(__filename) + ']';

var Run = {
    'js' : (codeStr, outputStream) => { // Run a JS string as code in a VM context.
        console.log(chalk.green(`${logPrefix} Ran JS code (${codeStr})`));
        const output = [];
        const sleep = function (milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds) {
                    break;
                }
            }
        };
        const newConsole = {
            log: function (msg) {
                output.push(msg);
                const stack = new Error().stack;
                const lineNum = stack.split('at ')[2].split(':')[1];
                sleep(1000);
                console.log(chalk.yellow(`${lineNum}: ${msg}`));
                outputStream.push(`${':' + btoa(lineNum)}|${btoa(msg + '\n')}|`);
            }
        };
        try {
            vm.runInNewContext(`'use strict';${codeStr}`, {
                require,
                console: newConsole
            });
        } catch (ex) {
            console.log(chalk.red(ex));
            newConsole.log(ex.name + ': ' + ex.message);
        } finally {
            outputStream.push('%');
            outputStream.push(null);
        }
        return output;
    }
};

Run.routes = [
    {
        method: 'POST', // TODO: Convert to POST. Gotta get the message queues to respect posts...
        path: '/run/js',
        handler: (request, reply) => {
            const code = atob(request.payload.code, reply);
            let outputStream = new stream.Readable();
            outputStream._read = () => {}; // noop
            reply(null, outputStream).header('transfer-encoding', '');
            setTimeout(() => Run.js(code, outputStream), 0);
        },
        config: {
            id: '/run/js',
            // SWAGGER DOCS
            description: 'Run JS',
            notes: 'Run a JS string as code in a VM context.',
            tags: ['api', 'Run', 'JS', 'get'],
            // END SWAGGER DOCS
            validate: {
                payload: {
                    code: Joi.string().max(10000)
                }
            }
        }
    }
];

module.exports = Run;
