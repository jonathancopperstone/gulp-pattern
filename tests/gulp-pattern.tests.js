var tape = require('tape'),
    fs = require('fs'),
    args = require('yargs').argv,
    sinon = require('sinon').sandbox.create(),
    proxyquire = require('proxyquire'),
    pattern = require('../src/gulp-pattern.js');

tape('module exports an instance', function(test) {
    test.equal(typeof pattern, 'object');
    test.end();
});

tape('module has init function', function(test) {
    test.equal(typeof pattern.init, 'function');
    test.end();
});

tape('module has addTasks function', function(test) {
    test.equal(typeof pattern.addTasks, 'function');
    test.end();
});

tape('module has addWorkflows function', function(test) {
    test.equal(typeof pattern.addWorkflows, 'function');
    test.end();
});

tape('addTasks adds all tasks to gulp object', function(test) {

    var gulp = { task: sinon.spy() },
        pattern = proxyquire('../src/gulp-pattern', { 'fs': { readdirSync: function() { return ['task1.tsk.js'] } }});

    var mockData = 'module.exports = function(gulp) { gulp.task(\'mocktask\'); }';
    fs.writeFile('./gulp/tasks/task1.tsk.js', mockData, function(err) {
        pattern.addTasks(gulp, args, {});
        test.equal(gulp.task.called, true);
        test.equal(gulp.task.args[0][0], 'mocktask');
        fs.unlink('./gulp/tasks/task1.tsk.js');
    });

    sinon.restore();
    test.end();
});

tape('addWorkflows adds all workflows to gulp object', function(test) {

    var gulp = { task: sinon.spy() },
        pattern = proxyquire('../src/gulp-pattern', { 'fs': { readdirSync: function() { return ['wflow1.wflow.js'] } }});

    var mockData = 'module.exports = function(gulp) { gulp.task(\'mockworkflow\'); }';
    fs.writeFile('./gulp/workflows/wflow1.wflow.js', mockData, function(err) {
        pattern.addWorkflows(gulp, args, {});
        test.equal(gulp.task.called, true);
        test.equal(gulp.task.args[0][0], 'mockworkflow');
        fs.unlink('./gulp/workflows/wflow1.wflow.js');
    });

    sinon.restore();
    test.end();
});
