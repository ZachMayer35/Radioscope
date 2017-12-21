'use strict';

process.env.NODE_ENV = "production";
import { expect } from 'chai';
import config from '../../variables';
import routes from '../../api/routes';
import Hapi from 'hapi';

var server;

describe('When Hard API is running it', () => {

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
        server.route(routes.filter((r) => (r.config.auth === undefined)));       
    }); 

    /* Region: Hard SplitString */
    it('should split the string "thisisawesome" passed to /api/hard/splitstring/thisisawesome', (done) => {        
        var requestOpts = {
            method: 'GET',
            url: '/api/hard/splitstring/thisisawesome',
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => { 
            expect(res.statusCode).to.equal(200);
            expect(res.result.length).to.equal(5);
            done();
        });
    });

    it('should fail to split the string "fffff" passed to /api/hard/splitstring/fffff', (done) => {        
        var requestOpts = {
            method: 'GET',
            url: '/api/hard/splitstring/fffff',
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => { 
            expect(res.statusCode).to.equal(200);
            expect(res.result.length).to.equal(0);
            done();
        });
    });
    /* End Region */
});
