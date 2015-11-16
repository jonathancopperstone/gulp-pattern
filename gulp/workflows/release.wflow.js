'use strict';

module.exports = function(gulp) {

    var help,
        dependencies = [
        'pack'
    ];

    help = 'build the code for release';

    gulp.task('release', help, dependencies);\
};
