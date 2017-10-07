/**
 *
 * @param lvl {number} level number
 */
this['@lib/spawnLevel'] = function(lvl){
    var my = this;
    return this._.lib.parser.parse(this._.selectOne("lib/levels/level" + lvl), function(x, y, type, params){
        if (type == '*'){
            console.log("Spawning:", x, y, type, params);
            let e = my._.sys.spawn('dna/levelWall', 'lab/camera');
            e.x = x;
            e.y = y;
        }
    });
};