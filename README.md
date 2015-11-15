## gulp-pattern

A helper gulp plugin you can use to keep your gulp tasks more organised and structured.

![](https://codeship.com/projects/110273f0-5d97-0133-33ac-3a8f5e5e1065/status?branch=master)

##### Contents

- [Using gulp-pattern](#using-gulp-pattern)
- [What is gulp-pattern?](#what-is-gulp-pattern)

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
