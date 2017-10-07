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
        '>': 'rightSpawn'
    };

    return this._.lib.parser.parse(this._.selectOne("lib/levels/level" + lvl), function(x, y, type, params) {
        let dna = typeMap[type];
        if (dna){
            let entity = my._.sys.spawn('dna/' + dna, 'lab/camera', {
                x: x,
                y: y,
            });
            if (dna === 'player') {
                my._.lab.camera.follow(entity)
            }
        }
    });
};
