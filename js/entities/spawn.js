// dot actor
(function() {
    var createSpawn = function(direction) {
        return function (_, dat) {

            if (!this._serial) this._serial = 1;
            else this._serial++;
            return {

                name: 'spawn-' + this._serial,
                // state
                dt: 0,
                timeToSpawn: 2,
                x: dat.x,
                y: dat.y,
                spawned: 0,
                toSpawn: 10,
                direction:direction,
                // evolve
                evo: function (scene, delta) {
                    this.dt += delta;
                    if (this.dt >= this.timeToSpawn && this.spawned < this.toSpawn) {
                        this.dt = 0;
                        this.spawnDude();
                        this.spawned++;
                    }
                },
                spawnDude: function () {
                    let pos = {
                        x: this.x,
                        y: this.y,
                        direction: direction
                    };
                    switch (direction) {
                        case constants.dir.UP:
                            pos.y -= 1;
                            break;
                        case constants.dir.DOWN:
                            pos.y += 1;
                            break;
                        case constants.dir.LEFT:
                            pos.x -= 1;
                            break;
                        case constants.dir.RIGHT:
                            pos.x += 1;
                            break;
                    }
                    let spawned = this._.sys.spawn('dna/dude', 'lab/camera/dudes', pos);
                    this._.lib.selectUtils.inc(constants.path.DUDES_SPAWNED_COUNT);
                },
                draw: function (ctx) {
                    ctx.fillStyle = "#FF00FF";
                    ctx.fillRect(this.x, this.y, 1, 1);
                }
            }

        };
    }

    this['@dna/upSpawn'] = createSpawn(constants.dir.UP);
    this['@dna/downSpawn']= createSpawn(constants.dir.DOWN);
    this['@dna/leftSpawn']= createSpawn(constants.dir.LEFT);
    this['@dna/rightSpawn']= createSpawn(constants.dir.RIGHT);
})();
