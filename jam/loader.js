"use strict"

var _boot$ = function(_) {
    // load all dna and libraries
    _.log.debug('loader.js',  'loading libraries...')

    _.load(_.env.basepath + 'sys.js')
    _.load(_.env.basepath + 'lib/math.js')
}
