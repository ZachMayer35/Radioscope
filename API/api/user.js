'use strict';

import path from 'path';
import chalk from 'chalk';
import Joi from 'joi';
import axios from 'axios';
import UserProfile from '../mongo/schemas/user';

var logPrefix = '[' + path.basename(__filename) + '] ';

const User = {
    'id' : (credentials) => { // Get Logged-in user ID
      const userId = credentials.sub;
      if (userId) {
        console.log(chalk.green(`${logPrefix} get user id ('${userId}') succeeded`));
      } else {
        console.log(chalk.red(`${logPrefix} get user id ('${JSON.stringify(credentials)}') failed`));
      }
      return {userId};
    },
    'createUpdate' : async function(request) {
        let OIDProfile = await axios.get('https://generictest35.auth0.com/userinfo', {headers: {'Authorization': `Bearer ${request.payload.accessToken}`}});
        let appProfile = await UserProfile.findOne({id: request.auth.credentials.sub});
        let profile;
        let OIDname = OIDProfile.data.name.match(RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) ? 
                        OIDProfile.data.nickname :
                        OIDProfile.data.name;
        if (!appProfile) {
            profile = new UserProfile({
                id: request.auth.credentials.sub,
                name: OIDname,
                profile: OIDProfile.data
            });
        } else {
            profile = appProfile;
            profile.profile = OIDProfile.data;
            profile.name = OIDname;
        }
        let response;
        try {
            response = profile.save();
            console.log(chalk.green(`${logPrefix} Create/Update User Profile ('${JSON.stringify(profile._id)}') succeeded`));
        } catch (e) {
            console.log(chalk.green(`${logPrefix} Create/Update User Profile ('${JSON.stringify(request.auth.credentials.sub)}') failed`));
            response = e.message;
        }
        return response;
    },
    'getUserProfile': async function(userId) {
        const profile = await UserProfile.findOne({id: userId});
        if (profile) {
            console.log(chalk.green(`${logPrefix} Get Profile ('${profile._id}') succeeded`));
        } else {
            console.log(chalk.green(`${logPrefix} Get Profile ('${userId}') failed`));
        }
        return profile;
    }
};

User.routes = [
    {
        method: 'GET',
        path: '/user/id',
        handler: (request, reply) => {
            reply(User.id(request.auth.credentials)).header('Authorization', request.headers.authorization);
        },
        config: {
            auth: 'jwt',
            id: '/User/Id',
            // SWAGGER DOCS
            description: 'Get User ID',
            notes: 'Get the authenticated user\'s id from their auth token',
            tags: ['api', 'User', 'get'],
            // END SWAGGER DOCS
        }
    },
    {
        method: 'POST',
        path: '/user/createupdate',
        handler: (request, reply) => {
            reply(User.createUpdate(request)).header('Authorization', request.headers.authorization);
        },
        config: {
            auth: 'jwt',
            id: '/User/CreateUpdate',
            // SWAGGER DOCS
            description: 'Create or Update a user/profile',
            notes: 'Get the authenticated user\'s id from their auth token and update their profile',
            tags: ['api', 'User', 'post'],
            // END SWAGGER DOCS
        }
    },
    {
        method: 'GET',
        path: '/user/profile',
        handler: (request, reply) => {
            reply(User.getUserProfile(request.auth.credentials.sub)).header('Authorization', request.headers.authorization);
        },
        config: {
            auth: 'jwt',
            id: '/User/Profile',
            // SWAGGER DOCS
            description: 'Get User Profile',
            notes: 'Get the authenticated user\'s Profile from their auth token',
            tags: ['api', 'User', 'get'],
            // END SWAGGER DOCS
        }
    }
];

export default User;
