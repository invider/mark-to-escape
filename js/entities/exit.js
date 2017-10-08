// dot actor
this['@dna/exit'] = function(_, dat) {

    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'exit-' + this._serial,
        // state
        dt: 0,
        x: dat.x,
        y: dat.y,

        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(this._.res.exit, this.x, this.y, 1, 1);
        }
    }

}
