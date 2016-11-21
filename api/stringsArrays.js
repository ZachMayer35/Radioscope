'use strict'

import path from 'path'
import chalk from 'chalk'
import Joi from 'joi'

var logPrefix = '[' + path.basename(__filename) + '] ';

var StringsArrays = {
    "1" : (str) => { // Determine if characters in the string are unique
        var chars = str.split('');
        var charMap = {};
        var returnFlag = true;
        chars.every((c) => {
            if(!charMap[c]){
                charMap[c] = c;
                return true; // continue every
            } else {
                returnFlag = false;
                return false; // break every        
            }
        });
        console.log(chalk.green(logPrefix + 'StringsArrays:1 for str = "' + str + '" returned ') + (returnFlag ? chalk.green(returnFlag.toString()) : chalk.red(returnFlag.toString())));
        return returnFlag;
    },
    "2" : (str) => { // Reverse a string
        //return str.split('').reverse().join(''); // too easy
        var chars = str.split('');
        var start = 0;
        var end = chars.length - 1;
        var reversed = '';
        while(end > start){
            var tmp = chars[start];
            chars[start] = chars[end];
            chars[end] = tmp;
            start++;
            end--;
        };
        reversed = chars.join('');
        console.log(chalk.green(logPrefix + 'StringsArrays:2 returned "' + reversed + '" for str = "' + str + '"'));
        return reversed;
    },
    "3" : (one, two) => { // Determine if two strings are permutations of eachother
        var returnFlag = true;
        if(one.length !== two.length){
            returnFlag = false;
        } else {
            var arr1 = one.split('').sort();
            var arr2 = two.split('').sort();
            arr1.every((c, i) => {
                if(c !== arr2[i]){
                    returnFlag = false;
                    return false; // break every
                } else {
                    return true; // continue every
                }
            }, this);
        }
        console.log(chalk.green(logPrefix + 'StringsArrays:3 is "' + one + '" a permutation of "' + two + '": ') + (returnFlag ? chalk.green(returnFlag.toString()) : chalk.red(returnFlag.toString())));
        return returnFlag;
    },
    "6" : (matrix) => { // Rotate a matrix by 90deg
        var layers = Math.ceil(matrix.length / 2);        
        for(var layer = 0; layer < layers; layer++){
            var first = layer;
            var last = matrix.length - 1 - layer;
            for(var i = first; i < last; i++){
                var offset = i - first;
                //save top
                var top = matrix[first][i];

                // left -> top
                matrix[first][i] = matrix[last - offset][first];

                //bottom -> left
                matrix[last - offset][first] = matrix[last][last - offset];

                //right -> botom
                matrix[last][last - offset] = matrix[i][last];

                //top -> right
                matrix[i][last] = top;
            }
        }
        console.log(chalk.green(logPrefix + 'Matrix Rotated'));
        return matrix;
    }
};

StringsArrays.routes = [
    { 
        method: 'GET', 
        path: '/stringsarrays/1/{string}', 
        handler: (request, reply) => {
            var str = request.params.string;
            reply(StringsArrays["1"](str));
        },
        config: {            
            // SWAGGER DOCS
            description: 'Strings and Arrays 1',
            notes: 'Determine if a string has only unique characters',
            tags: ['api', 'StringsArrays', 'get'],
            // END SWAGGER DOCS
            validate: {
                params: {
                    string: Joi.string().alphanum().min(0).max(1000)
                }
            }
        }
    },
    { 
        method: 'GET', 
        path: '/stringsarrays/2/{string}', 
        handler: (request, reply) => {
            var str = request.params.string;
            reply(StringsArrays["2"](str));
        },
        config: {            
            // SWAGGER DOCS
            description: 'Strings and Arrays 2',
            notes: 'Reverse a string.',
            tags: ['api', 'StringsArrays', 'get'],
            // END SWAGGER DOCS
            validate: {
                params: {
                    string: Joi.string().alphanum().min(0).max(1000)
                }
            }
        }
    },
    { 
        method: 'GET', 
        path: '/stringsarrays/3/{stringOne}/{stringTwo}', 
        handler: (request, reply) => {
            var one = request.params.stringOne;
            var two = request.params.stringTwo;
            reply(StringsArrays["3"](one, two));
        },
        config: {            
            // SWAGGER DOCS
            description: 'Strings and Arrays 3',
            notes: 'Decide if two strings are permutations of eachother.',
            tags: ['api', 'StringsArrays', 'get'],
            // END SWAGGER DOCS
            validate: {
                params: {
                    stringOne: Joi.string().alphanum().min(0).max(1000),
                    stringTwo: Joi.string().alphanum().min(0).max(1000)
                }
            }
        }
    },
    { 
        method: 'POST', 
        path: '/stringsarrays/6', // matrix should parse to a two dimensional array
        handler: (request, reply) => {            
            var matrix = request.payload.matrix;
            reply(StringsArrays["6"](matrix));
        },
        config: {            
            // SWAGGER DOCS
            description: 'Strings and Arrays 3',
            notes: 'Rotate a matrix (2D array)',
            tags: ['api', 'StringsArrays', 'get'],
            // END SWAGGER DOCS 
            validate: {
                payload: Joi.object().keys({ matrix: Joi.array() })
            }
        }
    }
];

module.exports = StringsArrays;