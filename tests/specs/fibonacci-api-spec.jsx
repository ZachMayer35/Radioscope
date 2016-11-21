'use strict';

process.env.NODE_ENV = "production";
var expect = require('chai').expect;
var config = require('../../variables');
var routes = require('../../api/routes');
var Hapi = require('hapi');

var server;

describe('When Fibonacci API is running it', () => {

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
    
    it('should provide the Nth Fibonacci Number at api/fibonacci/getNth/{n} for positive values of {n}', (done) => {
        var nValue = 20;
        var expectedFValue = 6765;
        var requestOpts = {
            method: 'GET',
            url: '/api/fibonacci/getNth/' + nValue.toString(),
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.equal(expectedFValue);
            done();
        });
    });

    it('should provide a 400 error at api/fibonacci/getNth/{n} for negative values of {n}', (done) => {
        var nValue = -2;        
        var requestOpts = {
            method: 'GET',
            url: '/api/fibonacci/getNth/' + nValue.toString(),
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(400);
            done();
        });
    });

    it('should provide all the Fibonacci Numbers up to N at api/fibonacci/getUpToN/{n} for positive values of {n}', (done) => {
        var nValue = 20;
        var expectedFValue = [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765];
        var requestOpts = {
            method: 'GET',
            url: '/api/fibonacci/getUpToN/' + nValue.toString(),
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(JSON.stringify(res.result)).to.equal(JSON.stringify(expectedFValue));
            done();
        });
    });

    it('should provide a 400 error at api/fibonacci/getUpToN/{n} for negative values of {n}', (done) => {
        var nValue = -2;        
        var requestOpts = {
            method: 'GET',
            url: '/api/fibonacci/getUpToN/' + nValue.toString(),
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(400);
            done();
        });
    });

    it('should provide all the Fibonacci Numbers up to N at api/fibonacci/{n} for positive values of {n}', (done) => {
        var nValue = 20;
        var expectedFValue = [1,1,2,3,5,8,13,21,34,55,89,144,233,377,610,987,1597,2584,4181,6765];
        var requestOpts = {
            method: 'GET',
            url: '/api/fibonacci/' + nValue.toString(),
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(JSON.stringify(res.result)).to.equal(JSON.stringify(expectedFValue));
            done();
        });
    });

    it('should provide a 400 error at api/fibonacci/getUpToN/{n} for negative values of {n}', (done) => {
        var nValue = -2;        
        var requestOpts = {
            method: 'GET',
            url: '/api/fibonacci/' + nValue.toString(),
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(400);
            done();
        });
    });

});