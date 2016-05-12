%app_js_content%

aWeather.run(['configService', '$interval', 'weatherService', function (configService, $interval, weatherService) {

    function update() {

        chrome.browserAction.setBadgeText({ text: '' });

        return weatherService.getCurrent(function(err, data) {

            if (err) {
                return;
            }

            var badgeText = [];

            if (data.weather.main.temp > 0) {
                badgeText.push('+');
            } else if (data.weather.main.temp < 0) {
                badgeText.push('-');
            }

            badgeText.push(Math.round(data.weather.main.temp));

            chrome.browserAction.setBadgeText({ text: badgeText.join('') });
        });
    }

    update();

    return $interval(update, configService.updateInterval);
}]);

angular.bootstrap(null, ['aWeather']);