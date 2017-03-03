'use strict';

import amqp from 'amqplib';
import chalk from 'chalk';
import routes from '../../api/routes';
import config from '../../variables';
import server from '../hapi/api_server';

const url = config.env.CLOUDAMQP_URL || 'amqp://localhost'; // Heroku supplied AMQP url or localhost.

const generateQueueForRoute = function (path, api) {
  amqp.connect(url).then((conn) => {
    return conn.createChannel().then((ch) => {
      const q = path;
      let ackd = false;
      const reply = function (msg) {
        console.log(` [.] ${path} message: ${msg.content}`);
        const _reply = function (response, ack) {
          let message = '';
          if (typeof response === 'string') {
            console.log(` [x] Responded with message: ${response}`);
            message = new Buffer(response);
          } else {
            console.log(` [x] Responded with message: ${JSON.stringify(response)}`);
            message = new Buffer(JSON.stringify(response));
          }
          ch.sendToQueue(msg.properties.replyTo,
                        message,
                        {correlationId: msg.properties.correlationId});
                    
          if (ack && !ackd) {
            ch.ack(msg);
          }
        };
        const readStream = function (reader) {   
          console.log('READING STREAM');
          reader.on('data', (buffer) => {                        
            let chunk = buffer.toString('utf-8');  
            // send msg.            
            if (chunk.indexOf('%') >= 0) {              
              _reply(chunk, false);
              console.log('EOF');
            } else {
              _reply(chunk, true);
              ackd = true;
            }
          });
        };
        const thinger = Object.assign({}, msg, {content: null});
        console.log(chalk.red(`msg content raw: ${JSON.stringify(thinger)}`));
        console.log(`fetching ${config.server.rootUrl}/api${msg.fields.routingKey}`);
        const method = JSON.parse(msg.content).method;
        const streaming = msg.properties.headers.streaming; // explicit bool for truthy check.        
        console.log('STREAMING? ' + streaming);
        const req = {
          method,
          url: method === 'GET' ? `/api/${JSON.parse(msg.content).path}` : `/api${msg.fields.routingKey}`
        };
        if (method === 'POST') {
          req.payload = JSON.parse(msg.content).payload;
        }
        // check request for stream...
        if (streaming) {          
          api.table()[0].table.find((route) => (route.path === req.url)).settings.handler(req, (body, res) => {
            console.log('RESPONDING...');                        
            return readStream(res);
          });
        } else {
          api.inject(req, (res) => {
            _reply(res.result, true);
          });
        }        
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
