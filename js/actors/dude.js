
this['@dna/dude'] = function(_, dat) {

    const UP = 'UP';
    const DOWN = 'DOWN';
    const LEFT = 'LEFT';
    const RIGHT = 'RIGHT';

    // generate unique id
    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        type: 'dude',
        name: 'dude_' + this._serial,
        //markable: true,
        //collidable: true,
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
                case UP:
                    this.testMove(0, -1)
                    break;
                case DOWN:
                    this.testMove(0, 1)
                    break;
                case LEFT:
                    this.testMove(0, 0)
                    break;
                case RIGHT:
                    this.testMove(1, 0)
                    break;
            }

            switch(this.direction){
                case UP:
                    this._y = this.y
                    this.y -= delta * this.speed;
                    break;
                case DOWN:
                    this._y = this.y
                    this.y += delta * this.speed;
                    break;
                case LEFT:
                    this._x = this.x
                    this.x -= delta * this.speed;
                    break;
                case RIGHT:
                    this._x = this.x
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
                case UP:
                    this.direction = DOWN
                    break;
                case DOWN:
                    this.direction = UP
                    break;
                case LEFT:
                    this.direction = RIGHT
                    break;
                case RIGHT:
                    this.direction = LEFT
                    break;
            }
        }
    }

};
