
this['@dna/dude'] = function(_, dat) {

    // generate unique id
    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'dude_' + this._serial,
        // state
        x: dat.x,
        y: dat.y,

        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.fillStyle="#0000FF";
            ctx.fillRect(this.x, this.y, 3, 3);
        }
    }

}
