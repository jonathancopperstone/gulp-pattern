'use strict';

module.exports = function(gulp, args, config) {

    var tape = require('gulp-tape'),
        colorize = require('tap-colorize');

    gulp.task('tape', 'run unit tests', function() {
        return gulp
                .src('tests/**/*.tests.js')
                .pipe(tape({
                    reporter: colorize()
                }));
    });
};
