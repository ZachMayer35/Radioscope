'use strict';

import path from 'path';
import chalk from 'chalk';
import Joi from 'joi';
import dictionary from '../data/dictionary';

var logPrefix = '[' + path.basename(__filename) + '] ';

const Hard = {
    'splitString' : (str) => { // Find all words given a string with whitespace and punctuation removed.
      const splitString = (str, result = '', sentences = []) => {
        const len = str.length 
        for(let i = 1; i <= len; i++){
          let prefix = str.slice(0, i);
          if(dictionary[prefix]){
            if(i === len){
              sentences.unshift(result + prefix);
              break;
            }
            splitString(str.slice(i), (result + prefix + ' '), sentences);
          }
        }
        return sentences;
      }
      const result = splitString(str);
      const success = result.length > 0 && str.length > 0;
      if (success) {
        console.log(chalk.green(logPrefix + 'Split String (' + str + ') succeeded'));
      } else {
        console.log(chalk.red(logPrefix + 'Split String (' + str + ') failed'));
      }
      return result;
    }
};

Hard.routes = [
    {
        method: 'GET',
        path: '/hard/splitstring/{str}',
        handler: (request, reply) => {
            var str = request.params.str;
            reply(Hard.splitString(str));
        },
        config: {
            id: '/hard/splitstring/',
            // SWAGGER DOCS
            description: 'Hard SplitString',
            notes: 'Find all words in a string with spaces and punctuation removed. Try "thisisawesome"',
            tags: ['api', 'Hard', 'get'],
            // END SWAGGER DOCS
            validate: {
                params: {
                    str: Joi.string().max(100)
                }
            }
        }
    }
];

export default Hard;
