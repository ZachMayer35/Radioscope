'use strict';

import path from 'path';
import chalk from 'chalk';
import Joi from 'joi';

var logPrefix = '[' + path.basename(__filename) + '] ';

const User = {
    'id' : (credentials) => { // Get Logged-in user ID
      const userId = credentials.sub.split('|')[1];
      if (userId) {
        console.log(chalk.green(logPrefix + 'Auth (' + credentials + ') succeeded'));
      } else {
        console.log(chalk.red(logPrefix + 'Auth (' + credentials + ') failed'));
      }
      return {userId};
    }
};

User.routes = [
    {
        method: 'GET',
        path: '/user/id',
        handler: (request, reply) => {
            reply(User.id(request.auth.credentials)).header("Authorization", request.headers.authorization);
        },
        config: {
            auth: 'jwt',
            id: '/User/Id/',
            // SWAGGER DOCS
            description: 'Get User ID',
            notes: 'Get the authenticated user\'s id from their auth token',
            tags: ['api', 'User', 'get'],
            // END SWAGGER DOCS
        }
    }
];

export default User;
