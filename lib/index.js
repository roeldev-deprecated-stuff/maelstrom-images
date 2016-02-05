/**
 * maelstrom-images | lib/index.js
 *
 * Streams:
 * ✓ optimize
 * - resize*
 *
 * Tasks:
 * ✓ images
 */
'use strict';

module.exports = function()
{
    const self = this; // maelstrom object

    this.plugin('images',
    {
        'file':  __filename,
        'alias': ['imgs'],

        /**
         * Return the location of raw, unoptimized images.
         */
        src: function($src)
        {
            let $types      = self.config.images.types.join(',');
            let $defaultSrc = self.config.src.images + '/**/*.{' + $types + '}';

            return self.utils.extendArgs($src, $defaultSrc);
        },

        /**
         * Return the location of the images output folder.
         */
        dest: function()
        {
            return self.config.dest.images;
        }
    });
};
