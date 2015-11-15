'use strict';

module.exports = new function() {

    var _ = require('lodash'),
        chalk = require('chalk'),
        args = require('yargs').argv,
        fs = require('fs'),
        path = require('path'),

        pattern = {};

    /**
     * Kick off loading and adding to gulp
     * both the tasks and workflows.
     * Add custom gulp task.
     */

    pattern.setup = function(gulp, args, appConfig) {
        var tasksAdded = pattern.addTasks(gulp, args, appConfig);
        var workflowsAdded = pattern.addWorkflows(gulp, args, appConfig);
        pattern._addListTask(gulp, tasksAdded, workflowsAdded);
    };

    /**
     * Search for any tasks in the
     * recommended directory './gulp/tasks'
     * with the extensions '.tsk.js' and
     * run each one to add to gulp.
     */

    pattern.addTasks = function(gulp, args, appConfig) {
        var tasks = fs.readdirSync('./gulp/tasks/');
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

    /**
     * Search for any workflows in the
     * recommended directory './gulp/workflows'
     * with the extensions '.wflow.js' and
     * run each one to add to gulp.
     */

    pattern.addWorkflows = function(gulp, args, appConfig) {
        var workflows = fs.readdirSync('./gulp/workflows/');
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

    /**
     * Add the `list` gulp tasks, which
     * prints out a help menu, listing out
     * all the tasks and workflows, categorised.
     * The task also accepts flags to specify
     * either listing just tasks (-t) or just
     * the workflows (-w)
     *
     * @private
     */

    pattern._addListTask = function(gulp, tasks, workflows) {

        gulp.task('list', function() {

            var printTasks = true,
                printWorkflows = true;

            if (args.t) {
                printWorkflows = false;
            } else if (args.w) {
                printTasks = false;
            }

            if (printTasks) {

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

            if (printWorkflows) {

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
