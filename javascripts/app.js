var aWeather = angular.module('aWeather', [
    'ngResource'
]).config(function () {

    aWeather.env = '%env%';

    // Mock chrome for running in browser window
    if ((typeof chrome === 'undefined' || typeof chrome.browserAction === 'undefined') && aWeather.env !== 'production') {

        chrome = {
            browserAction: {
                setBadgeText: function(text) {
                    console.log('Badge Text: "' + text.text + '"');
                },
                setIcon: function(path) {
                    console.log('Badge Icon: "' + path.path + '"');
                }
            }
        };
    }
});