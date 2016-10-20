aWeather.

controller('indexController', ['$scope', 'weatherService', '$timeout', function($scope, weatherService, $timeout) {

    function init() {

        $scope.current = null;
        $scope.error = null;
        $scope.loading = true;

        chrome.browserAction.setBadgeText({ text: '' });

        chrome.browserAction.setIcon({
            path: 'images/icon128.png'
        });

        return weatherService.getCurrent(function(err, data) {

            $scope.loading = false;

            if (err) {
                return $scope.error = err;
            }

            $scope.current = data.weather;

            $scope.updated = new moment(data.weather.dt * 1000).format('MMM Do HH:mm');

            var badgeText = [];

            if (data.weather.main.temp > 0) {
                badgeText.push('+');
            } else if (data.weather.main.temp < 0) {
                badgeText.push('-');
            }

            badgeText.push(Math.abs(Math.round(data.weather.main.temp)));

            chrome.browserAction.setBadgeText({ text: badgeText.join('') });

            if (data.weather && data.weather.weather && data.weather.weather.length && data.weather.weather[0].iconUrl) {
                chrome.browserAction.setIcon({
                    path: data.weather.weather[0].iconUrl
                });
            }
        });
    }

    $scope.retry = function() {

        $scope.loading = true;

        // Add ui delay
        return $timeout(init, 400);
    };

    return init();
}]);
