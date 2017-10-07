/**
 *
 * @param lvl {number} level number
 */
this['@lib/spawnLevel'] = function(lvl){
    var my = this;
    return this._.lib.parser.parse(this._.selectOne("lib/levels/level" + lvl), function(x, y, type, params){
        var objectToSpawn = false;
        if (type == '*'){
            console.log("Spawning:", x, y, type, params);
            objectToSpawn = my._.sys.spawn('dna/levelWall', 'lab/camera');
        }
        if (objectToSpawn){
            objectToSpawn.x = x;
            objectToSpawn.y = y;
        }
    });
};