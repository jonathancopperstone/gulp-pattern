'use strict';

module.exports = function(gulp, args, config) {

    var jshint = require('gulp-jshint');

    gulp.task('jshint:src', 'run jshint on src', function() {
        return gulp
                .src('./src/**/*.js')
                .pipe(jshint());
    });

    gulp.task('jshint:index', 'run jshint on index', function() {
        return gulp
                .src('./index.js')
                .pipe(jshint());
    });
};
