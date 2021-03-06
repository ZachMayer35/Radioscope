# Radioscope
A JavaScript run-time visualizer with head-to-head code fighting.

## Usage

### Dependencies

* node.js v4+
* Hapi
* webpack
* Babel
* react
* react-transform-hmr
* less
* chai
* jest

### Hot Module Reloading Development Mode

* `npm run dev`
* [http://localhost:8080](http://localhost:8080) Web Server
* [http://localhost:29957](http://localhost:29957) API Server
* HMR works on JSX and CSS files in the /web/client/ directory currently. Other files may cause Hapi to restart.
* nodemon watches for changes to other files and will restart the web and api servers as needed.
* If any one process needs to be restarted use `npm run web_dev` or `npm run api` or `npm run webpack`

### Production

* `npm run build` builds a webpack bundle and map to public/static/build
* `npm start` builds the webpack bundle and starts the web server and api server
* `npm run web` builds the webpack bundle and starts the web server only
* [http://localhost:8080](http://localhost:8080) Web Server
* [http://localhost:29957](http://localhost:29957) API Server

### Tests

* `npm run jest`
* Runs jest in watch mode. Will only run tests which are affected by files changed since the last commit and re-runs tests on save.
* `npm run test`
* Runs all tests once.