aWeather.

factory('apiService', ['$resource', 'configService', function($resource, configService) {

    var resources = {
        weather_current: $resource(configService.apiUrl + '/weather/current', {lang: '@lang'})
    };

    function run(point, method, param, callback) {

        return resources[point][method](param, function(result) {

            if (!result) {
                return callback('Empty response from API');
            }

            if (!result.success) {
                return callback(result.message || 'Unknown API error');
            }

            return callback(null, result);
        }, function() {
            return callback('Empty response from API');
        });
    };

    return {
        resources: resources,
        run: run
    };
}]);