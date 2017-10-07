"use strict"

var __basePath = 'js/'

var _boot$gameLogic = function(_) {
    _.log.debug('gameloader.js',  'loading game...');
    _.load(__basePath + 'levels/levels.js');
    _.load(__basePath + 'entities/wall.js');
    _.load(__basePath + 'entities/levelWall.js');
};