'use strict';

module.exports = function(gulp, args, config) {

    var jshint = require('gulp-jshint');

    gulp.task('jshint', 'run jshint on src', function() {
        return gulp
                .src('./index.js')
                .pipe(jshint());
    });
};
