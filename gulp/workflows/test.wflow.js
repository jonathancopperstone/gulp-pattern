'use strict';

module.exports = function(gulp, args) {

    var dependencies = [
        'tape',
    ];

    if (args.auto || args.a) {
        dependencies.push('watch:tape');
    }

    return gulp.task('test', dependencies);
};
