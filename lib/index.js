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
const Maelstrom    = require('maelstrom');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

const $plugin = new Maelstrom.Plugin(__filename, ['images', 'imgs'],
{
    /**
     * Return the location of raw, unoptimized images.
     */
    src: function($src)
    {
        let $types      = Maelstrom.config.images.types.join(',');
        let $defaultSrc = Maelstrom.config.src.images + '/**/*.{' + $types + '}';

        return Maelstrom.utils.extendArgs($src, $defaultSrc);
    },

    /**
     * Return the location of the images output folder.
     */
    dest: function()
    {
        return Maelstrom.config.dest.images;
    }
});

// -----------------------------------------------------------------------------

/**
 * Optimize images with _imagemin_,
 */
$plugin.setStream('optimize', function()
{
    return GulpImageMin(Maelstrom.config.images.imagemin);
});

// -----------------------------------------------------------------------------

/**
 *
 */
$plugin.setTask('default', [Maelstrom.TASK_WATCH], function()
{
    // *loop through resize tasks and resize the matching images according
    // *to config settings

    // when the --all flag is used, do not filter for last changed images,
    // but update all images
    let $changedFilesOnly = (GulpUtil.env.all !== true);

    return Maelstrom.gulp.src( $plugin.src() )
        .pipe( Maelstrom.stream('plumber') )
        .pipe( GulpIf($changedFilesOnly, GulpChanged( $plugin.dest() )) )
        .pipe( $plugin.stream('optimize') )
        .pipe( Maelstrom.stream('size') )
        .pipe( Maelstrom.gulp.dest($plugin.dest()) );
});

/**
 * Clean the CSS output dir from all excess files.
 */
$plugin.setTask('clean', [Maelstrom.TASK_CLEAN], function()
{
    Maelstrom.stream('clean', $plugin.dest())
});

// -----------------------------------------------------------------------------

module.exports = $plugin;
