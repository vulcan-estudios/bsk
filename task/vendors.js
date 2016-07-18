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
module.exports = function (gulp, plugins, config, option) {

    'use strict';

    return function() {

        return gulp.src(config.PATHS.vendors)
        .pipe(plugins.babel({presets: config.BABEL.presets}))
        .pipe(plugins.concat('vendors.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.PATHS.dist + '/js'));

    };

};
