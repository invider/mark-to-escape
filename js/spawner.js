/**
 *
 * @param lvl {number} level number
 */
this['@lib/spawnLevel'] = function(lvl){
    var my = this;
    var typeMap = {
        '*': 'levelWall',
        'w': 'wall',
        '@': 'player',
        '>': 'rightSpawn',
        '<': 'leftSpawn',
        '^': 'upSpawn',
        'v': 'downSpawn',
        'R': 'rightMark',
        'L': 'leftMark',
        'U': 'upMark',
        'D': 'downMark',
        'X': 'exit'
    };
    this._.patch(this._, constants.path.PLAYER_LEVEL, lvl);
    var lvlData = this._.selectOne("lib/levels/level" + lvl);
    if (!lvlData){
        throw new Error("No such level:" + lvl);
    }
    return this._.lib.parser.parse(lvlData, function(x, y, type, params, param) {
        let dna = typeMap[type];
        if (dna){
            let spawnTarget = 'lab/camera/tiles'
            if (dna === 'player') spawnTarget = 'lab/camera/dudes'
            let entity = my._.sys.spawn('dna/' + dna, spawnTarget, {
                x: x,
                y: y,
            });
            if (dna === 'player') {
                my._.lab.camera.follow(entity);
            }
        } else if (type.length == 0){
            console.error("Type is empty");
        }  else if (type != " "){
                console.error("No such type [" + type + "]");
        }
    });
};

this['@lib/spawnNextLevel'] = function(){
    this._.lib.selectUtils.nullifyPaths([
        constants.path.GOAL,
        constants.path.DUDES_ESCAPED,
        constants.path.DOWN_MARKERS_COUNT,
        constants.path.UP_MARKERS_COUNT,
        constants.path.RIGHT_MARKERS_COUNT,
        constants.path.LEFT_MARKERS_COUNT,
        constants.path.DUDES_SPAWNED_COUNT
    ], 0);
    //
    //  clean /camera/tiles and camera/dudes
    //
    this._.selectOne("/lab/camera/tiles").detachAll();
    this._.selectOne("/lab/camera/dudes").detachAll();
    return this._.lib.spawnLevel(this._.selectOneNumber(constants.path.PLAYER_LEVEL) + 1);
};
