// dot actor
this['@dna/levelWall'] = function(_, dat) {

    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'edge-' + this._serial,
        type: 'levelWall',
        solid: true,
        // state
        dt: 0,
        x: dat.x,
        y: dat.y,
        w: 1,
        h: 1,

        // evolve
        evo: function(scene, delta) {

        },

        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(this._.res.wall, this.x, this.y, 1, 1);
        }
    }

}
