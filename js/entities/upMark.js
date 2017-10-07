// dot actor
this['@dna/upMark'] = function(_, dat) {

    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'mark-' + this._serial,
        // state
        dt: 0,
        x: dat.x,
        y: dat.y,

        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.fillStyle="#00ffFF";
            ctx.fillRect(this.x, this.y, 3, 3);
        }
    }

};
