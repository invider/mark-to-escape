"use strict"

var __basePath = 'js/'

var _boot$gameLogic = function(_) {
    _.log.debug('gameloader.js',  'loading game...');

    _.load(__basePath + 'lib.js');
    _.load(__basePath + 'actors/dude.js');
    _.load(__basePath + 'actors/player.js');
    _.load(__basePath + 'levels/levels.js');
    _.load(__basePath + 'spawner.js');
    _.load(__basePath + 'entities/wall.js');
    _.load(__basePath + 'entities/exit.js');
    _.load(__basePath + 'entities/levelWall.js');
    _.load(__basePath + 'entities/rightSpawn.js');
};
