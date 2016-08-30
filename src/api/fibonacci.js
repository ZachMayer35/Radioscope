'use strict'

import path from 'path'
import chalk from 'chalk'
import Joi from 'joi'

var logPrefix = '[' + path.basename(__filename) + '] ';

var Fibonacci = {
    getNth: function(n){
        console.log(chalk.green(logPrefix + 'getNth called with parameter n = ' + n ));
        var a = 1;
        var b = 1;
        for(var i = 2; i < n; i++){
            var oldA = a;
            a = b;
            b = oldA + b;
        }
        console.log(chalk.green(logPrefix + 'getNth returned num = ' + b));
        return b;
    },
    getUpToN: function(n){       
        console.log(chalk.green(logPrefix + 'getUpToN called with parameter n = ' + n )); 
        var nums = [1,1];        
        if(n < 2){            
            nums.length = n;
            return nums;
        }
        for(var i = 2; i < n; i++){
            nums.push(nums[i-2] + nums[i-1]);
        }
        console.log(chalk.green(logPrefix + 'getUpToN returned nums = ' + JSON.stringify(nums))); 
        return nums;
    }
};

Fibonacci.routes = [
    { 
        method: 'GET', 
        path: '/fibonacci', 
        handler: function(request, reply){
            var n = request.params.n;
            reply(Fibonacci.getUpToN(n));
        },
        config: {
            validate: {
                params: {
                    n: Joi.number().integer().min(0).max(1000)
                }
            }
        }
    },
    { 
        method: 'GET', 
        path: '/fibonacci/getUpToN/{n}', 
        handler: function(request, reply){
            var n = request.params.n;
            reply(Fibonacci.getUpToN(n));
        },
        config: {
            validate: {
                params: {
                    n: Joi.number().integer().min(0).max(1000)
                }
            }
        }
    },
    { 
        method: 'GET', 
        path: '/fibonacci/getNth/{n}', 
        handler: function(request, reply){
            var n = request.params.n;
            reply(Fibonacci.getNth(n));
        },
        config: {
            validate: {
                params: {
                    n: Joi.number().integer().min(0)
                }
            }
        }
    }
];

module.exports = Fibonacci;