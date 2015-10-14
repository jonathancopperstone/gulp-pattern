'use strict';

module.exports = function(gulp, args, config) {

    return gulp.task('watch:tape', function() {
        gulp.watch('./tests/**/*.tests.js', ['tape']);
    });
};
