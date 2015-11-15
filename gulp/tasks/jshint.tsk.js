'use strict';

module.exports = function(gulp, args, config) {

    var jshint = require('gulp-jshint');

    gulp.task('jshit', ['jshint:src', 'jshint:dist']);

    gulp.task('jshint:src', 'run jshint on src', function() {
        return gulp
                .src('./src/**/*.js')
                .pipe(jshint());
    });

    gulp.task('jshint:dist', 'run jshint on dist', function() {
        return gulp
                .src('./index.js')
                .pipe(jshint());
    });
};
