/**
 * maelstrom-images | lib/tasks/default.js
 */
'use strict';

const GulpChanged = require('gulp-changed');
const GulpIf      = require('gulp-if');
const GulpUtil    = require('gulp-util');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function($plugin, $maelstrom)
{
    return function()
    {
        // *loop through resize tasks and resize the matching images according
        // *to config settings

        // when the --all flag is used, do not filter for last changed images,
        // but update all images
        let $changedFilesOnly = (GulpUtil.env.all !== true);

        return $maelstrom.gulp.src( $plugin.src() )
            .pipe( $maelstrom.stream('plumber') )
            .pipe( GulpIf($changedFilesOnly, GulpChanged( $plugin.dest() )) )
            .pipe( $plugin.stream('optimize') )
            .pipe( $maelstrom.stream('size') )
            .pipe( $maelstrom.gulp.dest($plugin.dest()) );
    };
};
