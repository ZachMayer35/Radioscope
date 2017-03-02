'use strict';

import amqp from 'amqplib';
import joi from 'joi';
import chalk from 'chalk';
import routes from '../../api/routes';
import fetch from 'isomorphic-fetch';
import config from '../../variables';
import server from '../hapi/api_server';

const url = config.env.CLOUDAMQP_URL || 'amqp://localhost'; // Heroku supplied AMQP url or localhost.

const generateQueueForRoute = function (path, api) {
  amqp.connect(url).then((conn) => {
    return conn.createChannel().then((ch) => {
      const q = path;
      const reply = function (msg) {
        console.log(` [.] ${path} message: ${msg.content}`);
        const _reply = function (response) {
          typeof response === 'string' ?
            console.log(` [x] Responded with message: ${response}`) :
            console.log(` [x] Responded with message: ${JSON.stringify(response)}`);
          ch.sendToQueue(msg.properties.replyTo,
                        new Buffer(JSON.stringify(response)),
                        {correlationId: msg.properties.correlationId});
          ch.ack(msg);
        };
        const thinger = Object.assign({}, msg, {content: null});
        console.log(chalk.red(`msg content raw: ${JSON.stringify(thinger)}`));
        console.log(`fetching ${config.server.rootUrl}/api${msg.fields.routingKey}`);
        const method = JSON.parse(msg.content).method;
        // check request for stream...
        const req = {
          method,
          url: method === 'GET' ? `/api/${JSON.parse(msg.content).path}` : `/api${msg.fields.routingKey}`
        };
        if (method === 'POST') {
          req.payload = JSON.parse(msg.content).payload;
        }

        api.inject(req, (res) => {
          _reply(res.result);
        });
      };

      let ok = ch.assertQueue(q, {durable: false});
      ok = ok.then(() => {
        ch.prefetch(1);
        return ch.consume(q, reply);
      });
      return ok.then(() => {
        console.log(` [x] Awaiting ${path} requests`);
      });
    });
  }).catch(console.warn);
};

const generateQueuesForRoutes = function (routeObjects, api) {
  routeObjects.forEach((route) => {
    if (route.config.id) {
      generateQueueForRoute(route.config.id.toLowerCase(), api);
    }
  });
};

// Start.
console.log('Generating Queues for Routes.');
generateQueuesForRoutes(routes, server);
