/**
 * Gulp Ruby Sass task
 * Generates the css compiled file from the SASS source files
 *
 * @param  {Gulp} gulp
 * @param  {Object} plugins Available gulp plugins
 * @param  {Object} config  Configuration options
 * @param  {Srting} option  Config build option
 * @return {function} Gulp task
 *
 * @example gulp rsass
 * @see gulpfile.js
 */
module.exports = function (gulp, plugins, config, option) {

    'use strict';

    return function () {

        var task = plugins.rsass(config.SASS.source + '/**/*.scss', {
            stopOnError:    false,
            loadPath:       config.SASS.import,
            lineNumbers:    (option !== 'prod') ? true : false,
            compass: true
        })
        .on('error', plugins.rsass.logError)
        .pipe(plugins.autoprefixer(config.BROWSERS))
        .pipe(gulp.dest(config.SASS.output));

        if(option !== 'watch') {
            return task; // End process
        }

        var _this   = this;
        var paths   = [config.SASS.source + '/**/*.scss'];
        gulp.watch(paths).on('change',function (event) {
            plugins.gutil.log(plugins.gutil.colors.cyan('rsass: ') + plugins.gutil.colors.green('File ' + event.path + ' was ' + event.type));
            _this.tasks.rsass.fn(gulp, plugins, config);
        });

    };

};