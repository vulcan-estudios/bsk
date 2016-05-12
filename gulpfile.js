'use strict';

/**
 * Imports
 */
var gulp            = require('gulp');
var plugins         = require('gulp-load-plugins')();
var requireDir      = require('require-dir');
var yaml            = require('js-yaml');
var fs              = require('fs');
var tasks           = requireDir('./task');

// Add custom plugins
plugins.browserify  = require('browserify');
plugins.bulkify     = require('bulkify');
plugins.folderify   = require('folderify');
plugins.guglify     = require('gulp-uglify');
plugins.path        = require('path');
plugins.pathmodify  = require('pathmodify');
plugins.source      = require('vinyl-source-stream');
plugins.stringify   = require('stringify');

// Load Config
var config          = loadConfig();
function loadConfig() {
    var ymlFile     = fs.readFileSync('./task/config.yml', 'utf8');
    return yaml.load(ymlFile);
}

/**********************************************
 *                  TASKS                     *
 **********************************************/
//
// Utility for sass

// Compass
gulp.task('compass',        tasks.compass(gulp, plugins, config));
gulp.task('compass:prod',   tasks.compass(gulp, plugins, config, true));

// Sass
gulp.task('sass',           tasks.sass(gulp, plugins, config));
gulp.task('sass:prod',      tasks.sass(gulp, plugins, config, true));

// Ruby Sass
gulp.task('rsass',          tasks.rsass(gulp, plugins, config));
gulp.task('rsass:prod',     tasks.rsass(gulp, plugins, config, true));

//------------------------------------------------------------------------------


//
// Utility for vendors
//

gulp.task('vendors',        tasks.vendors(gulp, plugins, config));
gulp.task('vendors:prod',   tasks.vendors(gulp, plugins, config, true));

//------------------------------------------------------------------------------

//
// Utility for browserify
//

gulp.task('browserify',     tasks.browserify(gulp, plugins, config));
gulp.task('browserify:prod',tasks.browserify(gulp, plugins, config, true));

//------------------------------------------------------------------------------

//
// Utility for watch
//
gulp.task('watch',          tasks.watch(gulp, plugins, config));
gulp.task('watch:prod',     ['compass:prod', 'vendors:prod', 'browserify:prod', 'watch']);

//------------------------------------------------------------------------------


//
// Defaults Task
//
gulp.task('default',        ['browserify', 'compass', 'watch']);
gulp.task('build',          ['watch:prod']);