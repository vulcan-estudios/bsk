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
module.exports = function (gulp, plugins, config, prod) {

    'use strict';

    return function() {

        return gulp.src(config.PATHS.vendors)
        .pipe(plugins.babel())
        .pipe(plugins.concat('vendors.min.js'))
        .pipe(plugins.uglify())
        .pipe(gulp.dest(config.PATHS.dist + '/js'));

    };

};
