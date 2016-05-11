/**
 * Gulp Compass task
 * Generates the css compiled file from the SASS source files
 *
 * @param  {Gulp} gulp
 * @param  {Object} plugins Available gulp plugins
 * @param  {Object} config  Configuration options
 * @param  {boolean} prod  Build to production
 * @return {function} Gulp task
 *
 * @example gulp compass
 * @see gulpfile.js
 */
module.exports = function (gulp, plugins, config, prod) {

    'use strict';

    return function () {

        gulp.src(config.SASS.source + '/**/*.scss')
        .pipe(plugins.compass({
            task: 'watch',
            project: plugins.path.join(__dirname, '../'),
            import_path: config.SASS.import,
            style: (prod) ? 'compressed' : 'compact',
            comments: (prod) ? false : true,
            sass: config.SASS.source,
            css: config.SASS.output
        })).on('error', function(err) {
            console.log("Error: ", err);
        }).pipe(plugins.autoprefixer(config.BROWSERS));

    };

};