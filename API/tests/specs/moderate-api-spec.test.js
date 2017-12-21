'use strict';

process.env.NODE_ENV = "production";
import { expect } from 'chai';
import config from '../../variables';
import routes from '../../api/routes';
import Hapi from 'hapi';

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
        server.route(routes.filter((r) => (r.config.auth === undefined)));       
    }); 

    /* Region: Moderate 1 */
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
    /* End Region */
});