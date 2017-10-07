/**
 *
 * @param lvl {number} level number
 */
this['@lib/spawnLevel'] = function(lvl){
    var my = this;
    var typeMap = {
        '*': 'levelWall',
        'w': 'wall',
        '@': 'dude',
        '>': 'rightSpawn',
        '<': 'leftSpawn',
        '^': 'upSpawn',
        'v': 'downSpawn'
    };

    return this._.lib.parser.parse(this._.selectOne("lib/levels/level" + lvl), function(x, y, type, params, param) {
        let dna = typeMap[type];
        if (dna){
            let entity = my._.sys.spawn('dna/' + dna, 'lab/camera', {
                x: x,
                y: y,
            });
            if (dna === 'dude') {
                my._.lab.camera.follow(entity)
            }
        }
    });
};
