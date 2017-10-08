// dot actor
(function() {
    this['@dna/rightSpawn'] = function (_, dat) {

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
            direction: arguments.callee.direction,
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
                    direction: this.direction
                };
                switch (this.direction){
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
                let alreadySpawned = this._.selectOneNumber(constants.path.DUDES_SPAWNED_COUNT);
                this._.patch(this._, constants.path.DUDES_SPAWNED_COUNT, alreadySpawned + 1);
            },
            // show the dot
            draw: function (ctx) {
                // draw dot
                ctx.fillStyle = "#FF00FF";
                ctx.fillRect(this.x, this.y, 1, 1);
            }
        }

    };
    this['@dna/leftSpawn'] = this['@dna/rightSpawn'];
    this['@dna/upSpawn'] = this['@dna/rightSpawn'];
    this['@dna/downSpawn'] = this['@dna/rightSpawn'];

    this['@dna/upSpawn'].direction = constants.dir.UP;
    this['@dna/downSpawn'].direction = constants.dir.DOWN;
    this['@dna/leftSpawn'].direction = constants.dir.LEFT;
    this['@dna/rightSpawn'].direction = constants.dir.RIGHT;
})();
