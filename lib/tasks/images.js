/**
 * maelstrom-images | lib/tasks/images.js
 */
'use strict';

const GulpChanged = require('gulp-changed');
const GulpIf      = require('gulp-if');
const GulpUtil    = require('gulp-util');

// // // // // // // // // // // // // // // // // // // // // // // // // // //

module.exports = function()
{
    const self      = this; // plugin object
    const Maelstrom = this.maelstrom;
    const Gulp      = Maelstrom.gulp;

    /**
     */
    this.addTask('images', function()
    {
        // *loop through resize tasks and resize the matching images according
        // *to config settings

        // when the --all flag is used, do not filter for last changed images,
        // but update all images
        let $changedFilesOnly = (GulpUtil.env.all !== true);

        return Gulp.src( self.src() )
            .pipe( Maelstrom.stream('plumber') )
            .pipe( GulpIf($changedFilesOnly, GulpChanged( self.dest() )) )
            .pipe( self.stream('optimize') )
            // .pipe( GulpSize(Config.main.size) )
            .pipe( Maelstrom.stream('size') )
            .pipe( Gulp.dest(self.dest()) );
    });
};
