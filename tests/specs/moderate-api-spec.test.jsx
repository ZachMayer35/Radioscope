'use strict';

process.env.NODE_ENV = "production";
var expect = require('chai').expect;
var config = require('../../variables');
var routes = require('../../api/routes');
var Hapi = require('hapi');

var server;

describe('When Moderate API is running it', () => {

    beforeEach(() =>{
        server = new Hapi.Server();
        server.connection({port: 8000});
        server.route({
            method: 'GET',
            path: '/{path*}',
            handler: (request, reply) => {
                reply('Hapi catch-all view for /' + request.params.path);
            }
        });
        server.route(routes);       
    }); 

    /* Region: Strings Arrays 1 */
    it('should swap the two numbers passed to /api/moderate/1/9/4', (done) => {        
        var requestOpts = {
            method: 'GET',
            url: '/api/moderate/1/9/4',
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(res.result.one).to.equal(4);
            expect(res.result.two).to.equal(9);
            done();
        });
    });
    
});