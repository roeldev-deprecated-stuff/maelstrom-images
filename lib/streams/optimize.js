/**
 * maelstrom-images | lib/streams/optimize.js
 */
'use strict';

const GulpImageMin = require('gulp-imagemin');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    const Maelstrom = this.maelstrom;
    const Config    = Maelstrom.config;

    /**
     * Optimize images with _imagemin_,
     */
    this.addStream('optimize', function()
    {
        return GulpImageMin(Config.images.imagemin);
    });
};
