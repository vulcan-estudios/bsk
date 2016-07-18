/**
 * Gulp vendors task
 * Watch for changed files for vendors
 *
 * @param  {Gulp} gulp
 * @param  {Object} plugins Available gulp plugins
 * @param  {Object} config  Configuration options
 * @param  {Srting} option  Config build option
 * @return {function} Gulp task
 *
 * @example gulp clean
 * @see gulpfile.js
 */

var S = require('string');

module.exports = function (gulp, plugins, config, option) {

    'use strict';

    return function () {

        var task    = plugins.browserify(config.BROWSERIFY.bootstrap)
        .plugin(plugins.pathmodify, {
            mods: config.BROWSERIFY.shortcuts.map (function(s) {
                var type    = s.type;
                var name    = s.name;
                var path    = S(__dirname).chompRight('task') + S(s.path).chompLeft('./');
                return plugins.pathmodify.mod[type](name, path);
            })
        })
        .transform(plugins.stringify)
        .transform(plugins.bulkify)
        .transform(plugins.babelify, {presets: config.BABEL.presets})
        .bundle().on('error', function (err) {
            console.log(err.stack);
            plugins.notify({
                'title': 'Compile Error',
                'message': err.message
            });
        })
        .pipe(plugins.source('app.js')); //Pass desired output filename to vinyl-source-stream

        if(option === 'prod') {
            task.pipe(plugins.buffer())
            .pipe(plugins.sourcemaps.init({loadMaps: true}))
            .pipe(plugins.uglify()).on('error', plugins.util.log)
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.PATHS.dist + '/js')); // Start piping stream to tasks!
        } else {
            task.pipe(gulp.dest(config.PATHS.dist + '/js')); // Start piping stream to tasks!
        }

        if(option !== 'watch') {
            return task; // End process
        }

        var _this   = this;
        var paths   = [config.PATHS.app + '/**/*.js', config.PATHS.app + '/**/*.html'];
        gulp.watch(paths).on('change',function (event) {
            plugins.gutil.log(plugins.gutil.colors.cyan('browserify: ') + plugins.gutil.colors.green('File ' + event.path + ' was ' + event.type));
            _this.tasks.browserify.fn(gulp, plugins, config);
        });

    };

};
