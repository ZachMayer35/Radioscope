process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

import dotenv from 'dotenv'
dotenv.config({ silent: true });

import jest from 'jest';
const argv = process.argv.slice(2);

jest.run(argv);
