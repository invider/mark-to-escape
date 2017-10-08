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
        stepOver: function(o){
            if (o.type === constants.types.DUDE){
                this._.lib.selectUtils.detach(o);
                let current = this._.lib.selectUtils.inc(constants.path.DUDES_ESCAPED);
                if (current >= this._.selectOneNumber(constants.path.GOAL)){
                    this._.lib.spawnNextLevel();
                }
            }
        },
        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(this._.res.exit, this.x, this.y, 1, 1);
        }
    }

};
