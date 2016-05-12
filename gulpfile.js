'use strict';

var async = require('async');
var fs = require('fs');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var replace = require('gulp-replace');
var gif = require('gulp-if');
var env = 'development';
var buildId = Number(String(fs.readFileSync('.build')).trim());

var css = [
    './scss/main.scss'
];

var js = [
    './bower_components/async/lib/async.js',
    './bower_components/lodash/dist/lodash.min.js',
    './bower_components/moment/moment.js',
    './bower_components/angular/angular.min.js',
    './bower_components/angular-resource/angular-resource.min.js',
    './javascripts/config.js',
    './javascripts/app.js',
    './javascripts/services/configService.js',
    './javascripts/services/apiService.js',
    './javascripts/services/weatherService.js',
    './javascripts/controllers/indexController.js'
];

var bg = [
    './views/index.html',
    './javascripts/background.js'
];

gulp.task('html', function() {

    return gulp.src(bg)
        .pipe(replace('%env%', env))
        .pipe(replace('%build\_id%', buildId))
        .pipe(replace('%app_js_content%', fs.readFileSync('./build/' + buildId + '/javascripts/all.js')))
        .pipe(gulp.dest('./'));
});

gulp.task('js', function() {

    return gulp.src(js)
        .pipe(concat('all.js'))
        .pipe(replace(/\%env\%/g, env))
        .pipe(gif(env === 'production', uglify()))
        .pipe(gulp.dest('./build/' + buildId + '/javascripts'));
});

gulp.task('css', function () {

    return gulp.src(css)
        .pipe(sass())
        .pipe(gif(env === 'production', cleanCss({
            rebase: false
        })))
        .pipe(gulp.dest('./build/' + buildId + '/stylesheets'));
});

gulp.task('production', function () {

    env = 'production';

    return gulp.start('css', 'js', 'html');
});

gulp.task('default', function () {

    env = 'development';

    return gulp.start('css', 'js', 'html');
});

gulp.task('watch', function () {

    gulp.start('default');

    return watch([
        './javascripts/*',
        './javascripts/**/*',
        './views/*',
        './scss/*'
    ], function() {
        return gulp.start('default');
    });
});
