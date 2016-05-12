aWeather.

factory('weatherService', ['apiService', function(apiService) {

    function getCurrent(callback) {

        return apiService.run('weather_current', 'get', {}, callback);
    }

    return {
        getCurrent: getCurrent
    };
}]);