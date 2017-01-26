'use strict';

import amqp from 'amqplib';
import joi from 'joi';
import routes from '../../api/routes';
import fetch from 'isomorphic-fetch';
import config from '../../variables';

const url = process.env.CLOUDAMQP_URL || 'amqp://localhost'; // Heroku supplied AMQP url or localhost.

const generateQueueForRoute = function (path, schema, handler) {
  amqp.connect(url).then((conn) => {
    process.once('SIGINT', () => { 
      conn.close();
    });
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
        //validate msg.content
        console.log(`fetching ${config.server.rootUrl}/api/${JSON.parse(msg.content).path}`);
        fetch(`${config.server.rootUrl}/api/${JSON.parse(msg.content).path}`)
          .then((response) => response.json())
          .then((response) => { _reply(response); });
        //handler(msg.content, _reply);
        /*const err = joi.validate(msg.content, schema, {});
        if (err) {
          _reply(err);
        } else {
          handler(msg.content, _reply);
        }*/
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

const generateQueuesForRoutes = function (routeObjects) {
  routeObjects.forEach((route) => {
    if (route.config.id) {
      generateQueueForRoute(route.config.id.toLowerCase(), route.validate, route.handler);
    }
  });
};

// Start.
generateQueuesForRoutes(routes);
