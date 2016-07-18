/**
 * Gulp Compass task
 * Generates the css compiled file from the SASS source files
 *
 * @param  {Gulp} gulp
 * @param  {Object} plugins Available gulp plugins
 * @param  {Object} config  Configuration options
 * @param  {Srting} option  Config build option
 * @return {function} Gulp task
 *
 * @example gulp compass
 * @see gulpfile.js
 */
module.exports = function (gulp, plugins, config, option) {

    'use strict';

    return function () {

        return gulp.src(config.SASS.source + '/**/*.scss')
        .pipe(plugins.compass({
            task:           (option === 'watch') ? 'watch' : 'compile',
            project:        plugins.path.join(__dirname, '../'),
            import_path:    config.SASS.import,
            encoding:       'utf-8',
            style:          (option === 'prod') ? 'compressed' : 'compact',
            comments:       (option === 'prod') ? false : true,
            sass:           config.SASS.source,
            css:            config.SASS.output
        })).on('error', function(err) {
            console.log("Error: ", err);
        }).pipe(plugins.autoprefixer(config.BROWSERS));

    };

};