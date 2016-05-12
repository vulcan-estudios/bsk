/**
 * Gulp Sass task
 * Generates the css compiled file from the SASS source files
 *
 * @param  {Gulp} gulp
 * @param  {Object} plugins Available gulp plugins
 * @param  {Object} config  Configuration options
 * @param  {boolean} prod  Build to production
 * @return {function} Gulp task
 *
 * @example gulp sass
 * @see gulpfile.js
 */
module.exports = function (gulp, plugins, config, prod) {

    'use strict';

    return function () {

        gulp.watch([config.SASS.source + '/**/*.scss'])
        .on('change',function (event) {

            plugins.gutil.log(plugins.gutil.colors.cyan('sass: ') + plugins.gutil.colors.green('File ' + event.path + ' was ' + event.type));

            return gulp.src([config.SASS.source + '/**/*.scss'])
            .pipe(plugins.sass({
                includePaths: config.SASS.import,
                outputStyle: (prod) ? 'compressed' : 'compact',
                sourceComments: 'normal'
            }))
            .on('error', plugins.sass.logError)
            .pipe(plugins.autoprefixer(config.BROWSERS))
            .pipe(gulp.dest(config.SASS.output));

        });

    };

};