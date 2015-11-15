'use strict';

var gulp    = require('gulp-help')(require('gulp')),
    args    = require('yargs').argv;

// The main config file for your
// application.

var config  = require('./gulp/configs/app.conf.js');

// Setup the pattern helper to go
// through your directory and add the
// gulp tasks and workflows.

var pattern = require('./src/gulp-pattern').setup(gulp, args, config);
