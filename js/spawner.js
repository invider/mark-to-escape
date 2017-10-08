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
    return this._.lib.parser.parse(this._.selectOne("lib/levels/level" + lvl), function(x, y, type, params, param) {
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

this['@lib/spawnNextLevel'] = function(lvl){
    return this._.lib.spawnLevel(this._.selectOneNumber(constants.path.PLAYER_LEVEL) + 1);
};
