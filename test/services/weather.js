'use strict';

describe('weatherService', function() {

    var configService, weatherService, $timeout, $httpBackend;

    beforeEach(angular.mock.module('aWeather'));

    beforeEach(inject(['$injector', '$timeout', 'configService', 'weatherService', function($injector, _$timeout, _configService, _weatherService) {

        configService = _configService;

        weatherService = _weatherService;

        $timeout = _$timeout;

        $httpBackend = $injector.get('$httpBackend');
    }]));

    it('should fetch weatcher data', function(done) {

        angular.mock.inject(function() {

            $httpBackend
                .whenGET(configService.apiUrl + '/weather/current')
                .respond(200, {
                    success: true,
                    weather: {
                        mock: true
                    }
                });

            weatherService.getCurrent(function(err, data) {

                expect(err).to.be.falsy;
                expect(data.weather.mock).to.be.truthy;

                return done();
            });

            $timeout.flush();
            $httpBackend.flush();
        });
    });

    it('should show error on incorrect data', function(done) {

        angular.mock.inject(function() {

            $httpBackend
                .whenGET(configService.apiUrl + '/weather/current')
                .respond(200, {
                    success: false
                });

            weatherService.getCurrent(function(err, data) {

                expect(err).to.be.equal('Unknown API error');

                return done();
            });

            $timeout.flush();
            $httpBackend.flush();
        });
    });
});