'use strict';

var fs = require('fs');
var buildId = Number(String(fs.readFileSync(__dirname + '/../.build')).trim());

module.exports = function(config) {

    return config.set({
        basePath: '..',
        autoWatch: false,
        singleRun: true,
        colors: true,
        port: 9876,
        frameworks: ['mocha'],
        client: {
            mocha: {
                timeout : 10000
            },
            captureConsole: true
        },
        reporters: ['mocha'],
        browsers: [
            'PhantomJS'
        ],
        files: [
            'build/' + buildId + '/javascripts/all.js',
            // Test libraries
            'node_modules/chai/chai.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'test/setup.js',
            'test/services/weather.js'
        ],
        exclude: [],
        logLevel: config.LOG_INFO
    });
};
