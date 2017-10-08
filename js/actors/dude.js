
this['@dna/dude'] = function(_, dat) {
    // generate unique id
    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'dude_' + this._serial,
        collidable: true,
        // state
        x: dat.x,
        y: dat.y,
        w: 1,
        h: 1,
        speed: 1,
        direction: dat.direction,

        hit: function(e) {
        },

        evo: function (scene, delta) {
            switch(this.direction){
                case constants.dir.UP:
                    this.testMove(0, -1)
                    break;
                case constants.dir.DOWN:
                    this.testMove(0, 1)
                    break;
                case constants.dir.LEFT:
                    this.testMove(0, 0)
                    break;
                case constants.dir.RIGHT:
                    this.testMove(1, 0)
                    break;
            }

            switch(this.direction){
                case constants.dir.UP:
                    this.y -= delta * this.speed;
                    break;
                case constants.dir.DOWN:
                    this.y += delta * this.speed;
                    break;
                case constants.dir.LEFT:
                    this.x -= delta * this.speed;
                    break;
                case constants.dir.RIGHT:
                    this.x += delta * this.speed;
                    break;
            }
        },

        draw: function(ctx) {
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(this._.res.player, this.x, this.y, 1, 1);
        },

        testMove: function(sx, sy) {
            if (!this._.lib.isFree(this.x + sx, this.y + sy)) {
                this.inverse()
            }
        },

        inverse: function() {
            switch(this.direction){
                case constants.dir.UP:
                    this.direction = constants.dir.DOWN
                    break;
                case constants.dir.DOWN:
                    this.direction = constants.dir.UP
                    break;
                case constants.dir.LEFT:
                    this.direction = constants.dir.RIGHT
                    break;
                case constants.dir.RIGHT:
                    this.direction = constants.dir.LEFT
                    break;
            }
        }
    }

};
