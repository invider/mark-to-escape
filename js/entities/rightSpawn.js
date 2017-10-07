// dot actor
(function() {
    const UP = 'UP';
    const DOWN = 'DOWN';
    const LEFT = 'LEFT';
    const RIGHT = 'RIGHT';
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
                    case UP:
                        pos.y -= 1;
                        break;
                    case DOWN:
                        pos.y += 1;
                        break;
                    case LEFT:
                        pos.x -= 1;
                        break;
                    case RIGHT:
                        pos.x += 1;
                        break;
                }
                debugger;
                let spawned = this._.sys.spawn('dna/dude', 'lab/camera', pos);
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

    this['@dna/upSpawn'].direction = UP;
    this['@dna/downSpawn'].direction = DOWN;
    this['@dna/leftSpawn'].direction = LEFT;
    this['@dna/rightSpawn'].direction = RIGHT;
})();
