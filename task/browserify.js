/**
 * Gulp vendors task
 * Watch for changed files for vendors
 *
 * @param  {Gulp} gulp
 * @param  {Object} plugins Available gulp plugins
 * @param  {Object} config  Configuration options
 * @param  {boolean} prod  Build to production
 * @return {function} Gulp task
 *
 * @example gulp clean
 * @see gulpfile.js
 */

var S = require('string');

module.exports = function (gulp, plugins, config, prod) {

    'use strict';

    return function () {
        
        var paths   = [config.PATHS.app + '/**/*.js', config.PATHS.app + '/**/*.html'];

        gulp.watch(paths)
        .on('change',function (event) {

            console.log('File ' + event.path + ' was ' + event.type);

            return plugins.browserify(config.BROWSERIFY.bootstrap)
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
            .bundle().on('error', function (err) {
                console.log(err.stack);
                plugins.notify({
                    'title': 'Compile Error',
                    'message': err.message
                });
            })
            .pipe(plugins.source('app.js')) //Pass desired output filename to vinyl-source-stream
            .pipe(gulp.dest(config.PATHS.dist + '/js')); // Start piping stream to tasks!

        });

    };

};
