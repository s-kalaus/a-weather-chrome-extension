a-weather-chrome-extension
===============

Built using AngularJS, basic API support, gulp assembling, karma for tests

===============
#Installation

* npm install
* bower install

### Execution

development:

    gulp watch

production:

    gulp production

test:

    karma start test/karma.conf.js

### Development

Point document root of webserver to directory with extension. Open SERVER_NAME in browser. Or install extension in Chrome browser

### Production deployment

* gulp production
* Remove everything except: images, build, manifest.json, index.html, background.js
* Pack
