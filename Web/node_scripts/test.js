process.env.NODE_ENV = 'test';
process.env.PUBLIC_URL = '';

require('dotenv').config({silent: true});

const jest = require('jest');
const argv = process.argv.slice(2);

jest.run(argv);
