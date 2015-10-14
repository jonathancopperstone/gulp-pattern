'use strict';

module.exports = function(gulp, args, config) {

    var tape = require('gulp-tape'),
        colorize = require('tap-colorize');

    return gulp.task('tape', 'run unit tests\n  (-a / --auto) watch tests automagically', function() {
        return gulp
                .src('tests/**/*.tests.js')
                .pipe(tape({
                    reporter: colorize()
                }));
    });
};
