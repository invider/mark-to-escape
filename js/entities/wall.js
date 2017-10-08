// dot actor
this['@dna/wall'] = function(_, dat) {

    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'wall-' + this._serial,
        type: constants.types.WALL,
        solid: true,
        // state
        dt: 0,
        x: dat.x,
        y: dat.y,
        h: 1,
        w: 1,
        finish: function() {
            this._.lib.sfx('wallDestroyed', 1)
        },
        // show the dot
        draw: function(ctx) {
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(this._.res.wall, this.x, this.y, 1, 1);
        }
    }

}
