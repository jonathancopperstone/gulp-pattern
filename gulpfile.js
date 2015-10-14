'use strict';

var _       = require('lodash'),
    fs      = require('fs'),
    gulp    = require('gulp-help')(require('gulp')),
    args    = require('yargs').argv,
    gulpDir = './gulp/',
    config  = gulpDir + 'configs/app.conf.js',
    tasks   = fs.readdirSync(gulpDir + 'tasks/'),
    wflows  = fs.readdirSync(gulpDir + 'workflows/');

    var pattern = require('./src/gulp-pattern').init(gulp, args, config);
