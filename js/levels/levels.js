this["@lib/parser/globalMacros"] = "";

var _boot$loadLevels = function(_){
    var __levelsBase  = __basePath + "/levels/";
    _.load(__levelsBase + 'levelParser.js');
    _.load(__levelsBase + 'level1.js');
    _.load(__levelsBase + 'level2.js');
    _.load(__levelsBase + 'level3.js');
};


//  Level string format:
//  variable=value\n
//  var2 = val2
// ^^^SETTINGS^^^
// M_F_D22
// ^^^MACROS^^^
//
//
//  @ - Player spawn
//  X - exit
//  * - level wall
//  < - left dude spawn
//  > - right dude spawn
//  ^ - up dude spawn
//  v - down dude spawn
//  w - regular wall
//  W - Water
//  U - Turn UP mark
//  D - Turn Down mark
//  L - Turn Left mark
//  R - Turn Right mark
//  Space - empty cell
//  \n - horizontal level end
//

