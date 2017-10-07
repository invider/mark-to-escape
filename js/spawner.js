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
    }

    return this._.lib.parser.parse(this._.selectOne("lib/levels/level" + lvl), function(x, y, type, params){
        let dna = typeMap[type];
        if (dna){
            let objectToSpawn = my._.sys.spawn('dna/' + dna, 'lab/camera', {
                x: x,
                y: y,
            });
            //objectToSpawn.x = x;
            //objectToSpawn.y = y;
        }
    });
};
