## gulp-pattern

A helper gulp plugin you can use to keep your gulp tasks more organised and structured.

![](https://codeship.com/projects/110273f0-5d97-0133-33ac-3a8f5e5e1065/status?branch=master)

##### Contents

- [Directory Structure](#directory-structure)
- [Using gulp-pattern](#using-gulp-pattern)
- [What is gulp-pattern?](#what-is-gulp-pattern)

### Directory structure
----

All the files which will be used by `gulp` are organised in a `gulp/` folder, in the root of the application. `gulpfile.js` will then be told to look through this folder and look for any tasks and config required for the application.

The directory structure should look like this:

    gulp/
        tasks/
        workflows/
        config/

In `tasks/` you'd expect to find all the individual gulp tasks. Tasks should be as coherent as possible, with each one attempting to do one thing only. If you want to do more than one thing, then you should think about using a workflow.

The naming convention for tasks is **[npm or task name].tsk.js**

In `workflows/` you'd expect to find specific workflows, which calls a group of the the individual tasks, related to that workflow. A workflow should be thought of as a group of tasks, and should be representative of a particular action run against your application.

Naming convention is **[workflow name].wflow.js**

In `config/`, you'll find the config files for the app in general: `app.conf.js`, and other custom config files for specific tasks, like; jshint, stylus.

Naming convention is **app.conf.js**

This config file should ideally be very thin, to limit the amount of config you'd need to remember when writing out your tasks and flows.

### Using gulp-pattern
----
To use this plugin, you're going to need the following dev dependencies:

- gulp-help
- yargs

Make sure you wrap `gulp` in `gulp-help`. See the [docs](https://github.com/chmontgomery/gulp-help) for more information. You also want to require in `yargs`:

    var gulp = require('gulp-help')(require('gulp'));
    var args = require('yargs').argv;

This plugin assumes you are following the directory structure [recommended](#what-is-gulp-pattern). This would look like:

    gulp/
        configs/
            app.conf.js
        tasks/
            [task name].tsk.js
        workflows/
            [workflow name].wflow.js


If you want to pass on your app's config to your tasks and workflows, then require it in your gulpfile.

    var config = require('./gulp/configs/app.conf.js');

Now you're all set to let `gulp-pattern` do its job.

    require('gulp-pattern').init(gulp, args, config);

This will now go through your tasks and workflows and add them to git. To view them, hit:

    gulp list

### What is gulp-pattern?
----

To understand better what `gulp-pattern` is, and how to use it, check out the [blog post](http://blog.johnnycopperstone.me/gulp-pattern/).
