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

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    let $plugin = new this.Plugin(__filename, ['images', 'imgs'],
    {
        /**
         * Return the location of raw, unoptimized images.
         */
        src: function($src)
        {
            let $config     = self.maelstrom.config;
            let $types      = $config.images.types.join(',');
            let $defaultSrc = $config.src.images + '/**/*.{' + $types + '}';

            return self.maelstrom.utils.extendArgs($src, $defaultSrc);
        },

        /**
         * Return the location of the images output folder.
         */
        dest: function()
        {
            return self.maelstrom.config.dest.images;
        }
    });

    $plugin.readStreams();
    $plugin.readTasks();

    return $plugin;
};
