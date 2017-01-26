'use strict';

import amqp from 'amqplib';
import joi from 'joi';
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
          console.log(` [x] Responded with message: ${response}`);
          ch.sendToQueue(msg.properties.replyTo,
                        new Buffer(JSON.stringify(response)),
                        {correlationId: msg.properties.correlationId});
          ch.ack(msg);
        };
        console.log(`fetching ${config.server.rootUrl}/api/${JSON.parse(msg.content).path}`);
        api.inject(`/api/${JSON.parse(msg.content).path}`, (res) => {
          console.log(res);
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
