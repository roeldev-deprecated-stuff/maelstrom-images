/**
 * maelstrom-images | lib/index.js
 *
 * Streams:
 * ✓ optimize
 * - resize*
 *
 * Tasks:
 * ✓ images
 * - images:clean
 */
'use strict';

const GulpChanged  = require('gulp-changed');
const GulpIf       = require('gulp-if');
const GulpImageMin = require('gulp-imagemin');
const GulpUtil     = require('gulp-util');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    const Maelstrom = this;
    const Config    = Maelstrom.config;
    const Gulp      = Maelstrom.gulp;
    const Utils     = Maelstrom.utils;

    // -------------------------------------------------------------------------

    let $plugin = new Maelstrom.Plugin(__filename, ['images', 'imgs'],
    {
        /**
         * Return the location of raw, unoptimized images.
         */
        src: function($src)
        {
            let $types      = Config.images.types.join(',');
            let $defaultSrc = Config.src.images + '/**/*.{' + $types + '}';

            return Utils.extendArgs($src, $defaultSrc);
        },

        /**
         * Return the location of the images output folder.
         */
        dest: function()
        {
            return Config.dest.images;
        }
    });

    // -------------------------------------------------------------------------

    /**
     * Optimize images with _imagemin_,
     */
    $plugin.addStream('optimize', function()
    {
        return GulpImageMin(Config.images.imagemin);
    });

    // -------------------------------------------------------------------------

    /**
     *
     */
    $plugin.addTask('images', function()
    {
        // *loop through resize tasks and resize the matching images according
        // *to config settings

        // when the --all flag is used, do not filter for last changed images,
        // but update all images
        let $changedFilesOnly = (GulpUtil.env.all !== true);

        return Gulp.src( $plugin.src() )
            .pipe( Maelstrom.stream('plumber') )
            .pipe( GulpIf($changedFilesOnly, GulpChanged( $plugin.dest() )) )
            .pipe( $plugin.stream('optimize') )
            // .pipe( GulpSize(Config.main.size) )
            .pipe( Maelstrom.stream('size') )
            .pipe( Gulp.dest($plugin.dest()) );
    });

    return $plugin;
};
