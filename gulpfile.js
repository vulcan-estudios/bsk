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
plugins.gutil       = require('gulp-util');
plugins.rsass       = require('gulp-ruby-sass');
plugins.path        = require('path');
plugins.pathmodify  = require('pathmodify');
plugins.source      = require('vinyl-source-stream');
plugins.buffer      = require('vinyl-buffer');
plugins.babelify    = require('babelify');
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
gulp.task('compass',            tasks.compass(gulp, plugins, config));
gulp.task('compass:watch',      tasks.compass(gulp, plugins, config, 'watch'));
gulp.task('compass:prod',       tasks.compass(gulp, plugins, config, 'prod'));

// Sass
gulp.task('sass',               tasks.sass(gulp, plugins, config));
gulp.task('sass:watch',         tasks.sass(gulp, plugins, config, 'watch'));
gulp.task('sass:prod',          tasks.sass(gulp, plugins, config, 'prod'));

// Ruby Sass
gulp.task('rsass',              tasks.rsass(gulp, plugins, config));
gulp.task('rsass:watch',        tasks.rsass(gulp, plugins, config, 'watch'));
gulp.task('rsass:prod',         tasks.rsass(gulp, plugins, config, 'prod'));

//------------------------------------------------------------------------------


//
// Utility for vendors
//

gulp.task('vendors',        tasks.vendors(gulp, plugins, config));
gulp.task('vendors:prod',   tasks.vendors(gulp, plugins, config, 'prod'));

//------------------------------------------------------------------------------

//
// Utility for browserify
//

gulp.task('browserify',         tasks.browserify(gulp, plugins, config));
gulp.task('browserify:watch',   tasks.browserify(gulp, plugins, config, 'watch'));
gulp.task('browserify:prod',    tasks.browserify(gulp, plugins, config, 'prod'));

//------------------------------------------------------------------------------

//
// Utility for watch
//
gulp.task('reload',             tasks.reload(gulp, plugins, config));

//------------------------------------------------------------------------------


//
// Defaults Task
//
gulp.task('default',        ['browserify:watch',    'compass:watch',    'reload']);
gulp.task('watch:compass',  ['browserify:watch',    'compass:watch',    'reload']);
gulp.task('watch:sass',     ['browserify:watch',    'sass:watch',       'reload']);
gulp.task('watch:rsass',    ['browserify:watch',    'rsass:watch',      'reload']);

gulp.task('build',          ['browserify:prod',     'compass:prod']);
gulp.task('build:compass',  ['browserify:prod',     'compass:prod']);
gulp.task('build:sass',     ['browserify:prod',     'sass:prod']);
gulp.task('build:rsass',    ['browserify:prod',     'rsass:prod']);

gulp.task('build:dev',      ['browserify',          'compass']);
