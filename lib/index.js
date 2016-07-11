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

const Maelstrom = require('maelstrom');

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
$plugin.setStream('./streams/optimize.js');

// -----------------------------------------------------------------------------

/**
 *
 */
$plugin.setTask('./tasks/default.js', [Maelstrom.TASK_WATCH]);

/**
 * Clean the CSS output dir from all excess files.
 */
$plugin.setTask('clean', [Maelstrom.TASK_CLEAN], function()
{
    Maelstrom.stream('clean', $plugin.dest())
});

// -----------------------------------------------------------------------------

module.exports = $plugin;
