
this['@dna/player'] = function(_, dat) {

    // generate unique id
    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'player_' + this._serial,
        // state
        x: dat.x,
        y: dat.y,

        evo: function(scene, dt) {
        },
        
        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.fillStyle="#FF1111";
            ctx.fillRect(this.x, this.y, 1, 1);
        }
    }

}


