/**
 * Gulp Ruby Sass task
 * Generates the css compiled file from the SASS source files
 *
 * @param  {Gulp} gulp
 * @param  {Object} plugins Available gulp plugins
 * @param  {Object} config  Configuration options
 * @param  {boolean} prod  Build to production
 * @return {function} Gulp task
 *
 * @example gulp rsass
 * @see gulpfile.js
 */
module.exports = function (gulp, plugins, config, prod) {

    'use strict';

    return function () {

        gulp.watch([config.SASS.source + '/**/*.scss'])
        .on('change',function (event) {

            console.log('File ' + event.path + ' was ' + event.type);

            return plugins.rsass(config.SASS.source + '/**/*.scss', {
                stopOnError: false,
                loadPath: config.SASS.import,
                lineNumbers: true,
                compass: true
            })
            .on('error', plugins.rsass.logError)
            .pipe(plugins.autoprefixer(config.BROWSERS))
            .pipe(gulp.dest(config.SASS.output));

        });

    };

};