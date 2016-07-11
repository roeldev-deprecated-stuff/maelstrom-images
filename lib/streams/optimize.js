/**
 * maelstrom-images | lib/streams/optimize.js
 */
'use strict';

const GulpImageMin = require('gulp-imagemin');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    return GulpImageMin(this.maelstrom.config.images.imagemin);
};
