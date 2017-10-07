// dot actor
this['@dna/levelWall'] = function() {

    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'dot-' + this._serial,
        // state
        dt: 0,

        // evolve
        evo: function(scene, delta) {

        },

        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.fillStyle="#0000FF";
            ctx.fillRect(this.x, this.y, 3, 3);
        }
    }

}
