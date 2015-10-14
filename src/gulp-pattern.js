'use strict';

module.exports = new function() {

    var _ = require('lodash'),
        chalk = require('chalk'),
        q = require('q'),
        args = require('yargs').argv,
        fs = require('fs'),
        path = require('path'),
        pattern = {};

    pattern.init = function(gulp, args, appConfig) {

        var tasksAdded = pattern.addTasks(gulp, args, appConfig);
        var workflowsAdded = pattern.addWorkflows(gulp, args, appConfig);
        pattern._addHelpTasks(gulp, tasksAdded, workflowsAdded);
    };

    pattern.addTasks = function(gulp, args, appConfig) {

        var tasks = pattern._getTasks();
        _.each(tasks, function(task) {
            var taskBreakdown = task.split('.');
            if (taskBreakdown[1] === 'tsk') {
                var taskName = taskBreakdown[0] + '.' + taskBreakdown[1];
                require
                    (path.join(__dirname, '../gulp/tasks/' + taskName))
                    (gulp, args, appConfig);
            }
        });
        return _.cloneDeep(gulp.tasks);
    };

    pattern.addWorkflows = function(gulp, args, appConfig) {

        var workflows = pattern._getWorkflows();
        _.each(workflows, function(workflow) {
            var workflowBreakdown = workflow.split('.');
            if (workflowBreakdown[1] === 'wflow') {
                var workflowName = workflowBreakdown[0] + '.' + workflowBreakdown[1];
                require
                    (path.join(__dirname, '../gulp/workflows/' + workflowName))
                    (gulp, args, appConfig);
            }
        });
        return _.cloneDeep(gulp.tasks);
    };

    pattern._getTasks = function() {
        return fs.readdirSync('./gulp/tasks/');
    };

    pattern._getWorkflows = function() {
        return fs.readdirSync('./gulp/workflows/');
    };

    pattern._addHelpTasks = function(gulp, tasks, workflows) {

        gulp.task('list', function() {

            if (tasks) {

                console.log('');
                console.log('');
                console.log(chalk.yellow.bold('list of tasks:'));
                console.log(chalk.yellow.bold('--------------'));

                _.each(Object.keys(tasks).sort(), function(name) {
                    console.log(chalk.white.bold(name));
                    if (tasks[name].help) {
                        console.log('  ' + chalk.gray(tasks[name].help.message));
                    }
                });
            }

            if (workflows) {

                console.log('');
                console.log('');
                console.log(chalk.yellow.bold('list of workflows:'));
                console.log(chalk.yellow.bold('------------------'));

                var workflowNames = _.xor(Object.keys(workflows), Object.keys(tasks));
                _.each(workflowNames.sort(), function(name) {
                    console.log(chalk.white.bold(name));

                    if (workflows[name].dep.length > 0) {
                        var end,
                            deps = ' - ';
                        _.each(workflows[name].dep, function(dep, i) {
                            end = (workflows[name].dep.length === (i + 1)) ? '.' : ', ';
                            deps = deps + dep + end;
                        });
                        console.log(chalk.gray(deps));
                    }
                });
            }

            console.log('');
            console.log('');
            return gulp;
        });
    };

    return pattern;
};
