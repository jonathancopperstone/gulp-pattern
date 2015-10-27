'use strict';

module.exports = function(gulp, args) {

    var dependencies = [
        'jshint:src',
        'tape',
        'pack',
        'jshint:index'
    ];

    gulp.task('vet', dependencies);
};
