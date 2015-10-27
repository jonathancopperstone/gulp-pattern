'use strict';

module.exports = function(gulp, args, config) {

    gulp.task('watch:tape', function() {
        gulp.watch('./tests/**/*.tests.js', ['tape']);
    });
};
