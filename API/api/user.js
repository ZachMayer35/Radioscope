'use strict';

import path from 'path';
import chalk from 'chalk';
import Joi from 'joi';
import axios from 'axios';
import UserProfile from '../mongo/schemas/user';

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
    },
    'addUser' : (user) => {
        return user;
    }
};

User.routes = [
    {
        method: 'GET',
        path: '/user/id',
        handler: (request, reply) => {
            let profile = new UserProfile({
                id: request.auth.credentials.sub,
                name: 'TBD',
                profile: {}
            });
            profile.save((e, p) => {
                if(e){
                    console.log(chalk.red(e));                    
                }
                reply(User.id(request.auth.credentials)).header("Authorization", request.headers.authorization);
            });
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
    },
    {
        method: 'POST',
        path: '/user/updateProfile',
        handler: (request, reply) => {
            console.log(request.payload);
            const accessToken = request.payload.accessToken;
            axios.get('https://generictest35.auth0.com/userinfo', {headers: {'Authorization': `Bearer ${accessToken}`}}).then(res => {
                console.log(res.data);
                UserProfile.findOneAndUpdate({id: request.auth.credentials.sub}, {name: res.data.name, profile: res.data}, (e, profile) => {
                    reply(profile).header('Authorization', request.headers.authorization);
                })
            }).catch(ex => {
                console.log(ex.message);
            });            
        },
        config: {
            auth: 'jwt',
            id: '/User/UpdateProfile/',
            // SWAGGER DOCS
            description: 'Update User Profile from OpenId Profile',
            notes: 'Get the authenticated user\'s profile from their openId profile',
            tags: ['api', 'User', 'post'],
            // END SWAGGER DOCS
        }
    },
    {
        method: 'GET',
        path: '/user/profile',
        handler: (request, reply) => {            
            UserProfile.findOne({id: request.auth.credentials.sub}, null, (e, p) => {
                if(e){
                    console.log(chalk.red(e));                    
                }
                reply(p).header("Authorization", request.headers.authorization);
            });
        },
        config: {
            auth: 'jwt',
            id: '/User/Profile/',
            // SWAGGER DOCS
            description: 'Get User Profile',
            notes: 'Get the authenticated user\'s Profile from their auth token',
            tags: ['api', 'User', 'get'],
            // END SWAGGER DOCS
        }
    }
];

export default User;
