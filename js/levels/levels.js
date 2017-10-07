this["@lib/parser/globalMacros"] = "";

var _boot$loadLevels = function(_){
    var __levelsBase  = __basePath + "/levels/";
    _.load(__levelsBase + 'levelParser.js');
    _.load(__levelsBase + 'level1.js');
};

//
//  @ - Player spawn
//  X - exit
//  < - left dude spawn
//  > - right dude spawn
//  ^ - up dude spawn
//  v - down dude spawn
//  w - regular wall
//  M - macro in format: M(Letter) symbols
//  Space - empty cell
//
