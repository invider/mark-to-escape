// dot actor
this['@dna/water'] = function(_, dat) {

    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        type: "water",
        name: 'water-' + this._serial,
        // state
        dt: 0,
        x: dat.x,
        y: dat.y,
        stepOver: function(o){
            if (o.type === constants.types.DUDE){
                this._.lib.selectUtils.detach(o);
                this._.lib.selectUtils.inc(constants.path.DUDES_DEAD);
            }
        },
        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(this._.res.water, this.x, this.y, 1, 1);
        }
    }

};
