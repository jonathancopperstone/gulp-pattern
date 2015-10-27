'use strict';

module.exports = function(gulp, config) {

    var rename = require('gulp-rename');

    gulp.task('pack', 'pack src into dist index', function() {
        return gulp
                .src('./src/gulp-pattern.js')
                .pipe(rename('index.js'))
                .pipe(gulp.dest('./'));
    });
};
