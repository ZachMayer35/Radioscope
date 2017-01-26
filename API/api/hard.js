'use strict';

import path from 'path';
import chalk from 'chalk';
import Joi from 'joi';
import dictionary from '../data/dictionary';

var logPrefix = '[' + path.basename(__filename) + '] ';

const Hard = {
    'splitString' : (str) => { // Find all words given a string with whitespace and punctuation removed.
      const sentenceBuilder = (cache, targetLength, sentence = [], sentences = []) => {
        const nextPos = sentence.join('').length;
        if (!cache[nextPos]) {
          if (nextPos === targetLength) {
            sentences.unshift(sentence.join(' '));
          }	
        } else {
          let words = cache[nextPos];
          for (let x = 0; x < words.length; x++) {     
            sentenceBuilder(cache, targetLength, sentence.concat([words[x]]), sentences);
          }
        }
        return sentences;
      };

      const findWords = (chars, dict, key = 0, cache = {}) => {
        if (!Array.isArray(chars)) {
          chars = chars.split('');
        }
        let word = '';
        let localCache = [];
        for (let x = key; x < chars.length; x++) {
          word += chars[x];
          if (dict[word.toLowerCase()]) {
            if (findWords(chars, dict, x + 1, cache) || x === chars.length - 1) {
              localCache.push(word);
            }
          }
        }
        if (localCache.length > 0) {
          cache[key] = (localCache);
        }
        return sentenceBuilder(cache, chars.length);
      };
      const result = findWords(str, dictionary);
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
