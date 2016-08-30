# Radioscope
A JavaScript run-time visualizer with head-to-head code fighting.

## Usage

### Dependencies

* node.js v4+
* Hapi
* webpack
* Babel
* react
* react-transform-hmr.

### Hot Module Reloading Development Mode

* `npm run dev`
* `npm run webpack` in another console
* [http://localhost:3000](http://localhost:3000)
* HMR works on JSX and CSS files currently. Other files may cause Hapi to restart.

### Production

* `npm run build`
* `npm start`
* [http://localhost:2000](http://localhost:2000)