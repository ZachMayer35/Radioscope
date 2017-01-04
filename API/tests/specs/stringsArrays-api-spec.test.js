'use strict';

process.env.NODE_ENV = "production";
import { expect } from 'chai';
import config from '../../variables';
import routes from '../../api/routes';
import Hapi from 'hapi';

var server;

describe('When StringsArrays API is running it', () => {

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
    it('should correctly tell that the string "abc" is unique at /api/StringsArrays/1/abc', (done) => {        
        var requestOpts = {
            method: 'GET',
            url: '/api/stringsarrays/1/abc',
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.equal(true);
            done();
        });
    });
    it('should correctly tell that the string "aaa" is not unique at /api/StringsArrays/1/aaa', (done) => {        
        var requestOpts = {
            method: 'GET',
            url: '/api/stringsarrays/1/aaa',
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.equal(false);
            done();
        });
    });
    /* End Region */

    /* Region: Strings Arrays 2 */
    it('should reverse the string "abc" to "cba" at /api/StringsArrays/2/abc', (done) => {        
        var requestOpts = {
            method: 'GET',
            url: '/api/stringsarrays/2/abc',
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.equal("cba");
            done();
        });
    });
    /* End Region */

    /* Region: Strings Arrays 3 */
    it('should correctly tell that the string "abc" is a permutation of "cba" at /api/StringsArrays/3/abc/cba', (done) => {        
        var requestOpts = {
            method: 'GET',
            url: '/api/stringsarrays/3/abc/cba',
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.equal(true);
            done();
        });
    });
    it('should correctly tell that the string "abc" is NOT a permutation of "def" at /api/StringsArrays/3/abc/def', (done) => {        
        var requestOpts = {
            method: 'GET',
            url: '/api/stringsarrays/3/abc/def',
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.equal(false);
            done();
        });
    });
    it('should correctly tell that the string "abcd" is NOT a permutation of "def" at /api/StringsArrays/3/abcd/def', (done) => {        
        var requestOpts = {
            method: 'GET',
            url: '/api/stringsarrays/3/abcd/def',
            headers: {
                'host': 'localhost'
            }
        };

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(res.result).to.equal(false);
            done();
        });
    });
    /* End Region */

    /* Region: Strings Arrays 6 */
    it('should correctly rotate a square matrix passed as a string to /api/StringsArrays/6/{matrix}', (done) => {
        var matrix = [
            ["a","b","c","d","e"],
            ["f","g","h","i","j"],
            ["k","l","m","n","o"],
            ["p","q","r","s","t"],
            ["u","v","w","x","y"]
        ];

        var requestOpts = {
            method: 'POST',
            url: '/api/stringsarrays/6',
            payload: {
                matrix: matrix
            },
            headers: {
                'host': 'localhost'
            }
        };

        var rotatedMatrix = [
            ["u","p","k","f","a"],
            ["v","q","l","g","b"],
            ["w","r","m","h","c"],
            ["x","s","n","i","d"],
            ["y","t","o","j","e"]
        ];

        server.inject(requestOpts, (res) => {          
            expect(res.statusCode).to.equal(200);
            expect(JSON.stringify(res.result)).to.equal(JSON.stringify(rotatedMatrix));
            done();
        });
    });
    /* End Region */
});