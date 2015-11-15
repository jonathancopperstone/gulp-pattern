'use strict';

module.exports = function(gulp, args) {

    var dependencies = [
        'jshint'
    ];

    if (args.src || args.s) {
        dependencies = ['jshint:src'];
    } else if (args.dist || args.d) {
        dependencies = ['jshint:dist'];
    }

    gulp.task('vet', dependencies);
};
