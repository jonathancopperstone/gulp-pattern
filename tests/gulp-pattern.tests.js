var tape = require('tape'),
    fs = require('fs'),
    sinon = require('sinon').sandbox.create(),
    pattern = require('../src/gulp-pattern.js');

tape('module exports an instance', function(test) {
    test.equal(typeof pattern, 'object');
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

tape('module has _getTasks function', function(test) {
    test.equal(typeof pattern._getTasks, 'function');
    test.end();
});

tape('module has _getWorkflows function', function(test) {
    test.equal(typeof pattern._getWorkflows, 'function');
    test.end();
});

tape('addTasks adds all tasks to gulp object', function(test) {

    pattern._getTasks = sinon.stub();
    pattern._getTasks.returns(['task1.tsk.js']);

    var gulp = { task: sinon.spy() };

    var mockData = 'module.exports = function(gulp) { gulp.task(\'mocktask\'); }';
    fs.writeFile('./gulp/tasks/task1.tsk.js', mockData, function(err) {
        pattern.addTasks(gulp);
        test.equal(gulp.task.called, true);
        test.equal(gulp.task.args[0][0], 'mocktask');
        fs.unlink('./gulp/tasks/task1.tsk.js');
    });

    sinon.restore();
    test.end();
});

tape('addWorkflows adds all workflows to gulp object', function(test) {

    pattern._getWorkflows = sinon.stub();
    pattern._getWorkflows.returns(['wflow1.wflow.js']);

    var gulp = { task: sinon.spy() };

    var mockData = 'module.exports = function(gulp) { gulp.task(\'mockworkflow\'); }';
    fs.writeFile('./gulp/workflows/wflow1.wflow.js', mockData, function(err) {
        pattern.addWorkflows(gulp);
        test.equal(gulp.task.called, true);
        test.equal(gulp.task.args[0][0], 'mockworkflow');
        fs.unlink('./gulp/workflows/wflow1.wflow.js');
    });

    sinon.restore();
    test.end();
});
