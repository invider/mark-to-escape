// dot actor
this['@dna/wall'] = function(_, dat) {

    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'dot-' + this._serial,
        // state
        dt: 0,
        x: dat.x,
        y: dat.y,

        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.fillStyle="#0000FF";
            ctx.fillRect(this.x, this.y, 1, 1);
        }
    }

}
