"use strict"

var __basePath = 'js/'

var _boot$gameLogic = function(_) {
    _.log.debug('gameloader.js',  'loading game...');

    _.load(__basePath + 'augment.js');
    _.load(__basePath + 'res.js');
    _.load(__basePath + 'lib.js');
    _.load(__basePath + 'collide.js');
    _.load(__basePath + 'actors/dude.js');
    _.load(__basePath + 'actors/player.js');
    _.load(__basePath + 'levels/levels.js');
    _.load(__basePath + 'spawner.js');
    _.load(__basePath + 'entities/wall.js');
    _.load(__basePath + 'entities/exit.js');
    _.load(__basePath + 'entities/water.js');
    _.load(__basePath + 'entities/mark.js');
    _.load(__basePath + 'entities/speedUpMark.js');
    _.load(__basePath + 'entities/levelWall.js');
    _.load(__basePath + 'entities/spawn.js');
    _.load(__basePath + 'playerInfo.js');
    _.load(__basePath + 'panel.js');
    _.load(__basePath + 'overlay.js');
};
