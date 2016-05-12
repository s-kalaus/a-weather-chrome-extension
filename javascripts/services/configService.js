aWeather.

factory('configService', function() {

    var data = {
        get: function(key) {
            return data[key];
        }
    };

    _.assign(data, window.config, window.config[aWeather.env]);

    delete data.envs;

    return data;
});