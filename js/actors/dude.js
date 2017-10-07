
this['@dna/dude'] = function(_, dat) {

    const UP = 'UP';
    const DOWN = 'DOWN';
    const LEFT = 'LEFT';
    const RIGHT = 'RIGHT';

    // generate unique id
    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'dude_' + this._serial,
        // state
        x: dat.x,
        y: dat.y,
        speed: 1,
        direction: dat.direction,

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
                    this.y -= delta * this.speed;
                    break;
                case DOWN:
                    this.y += delta * this.speed;
                    break;
                case LEFT:
                    this.x -= delta * this.speed;
                    break;
                case RIGHT:
                    this.x += delta * this.speed;
                    break;
            }
        },

        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.fillStyle="#FFFFFF";
            ctx.fillRect(this.x, this.y, 1, 1);
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
