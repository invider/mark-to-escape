// some boot actions
_boot$game = function(_) {
    _.log.out('boot game logic')
}

_setup$game = function(_) {
    _.log.out('setup game logic - copy to dna -> lab')

    _.sys.spawn('dna/camera', 'lab')
    _.lab.camera.viewport(30,11);

    let levelParams = _.lib.spawnLevel(1);
    
    _.sys.spawn('dna/dot', 'lab/camera')
}

// background
this['@lab/background'] = {
    draw: function(ctx) {
        // clear the screen
        ctx.fillStyle = "#D0B0A0"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
};

// dot actor
this['@dna/dot'] = function() {

    if (!this._serial) this._serial = 1
    else this._serial++

    return {
        name: 'dot-' + this._serial,
        // state
        dt: 0,

        // evolve
        evo: function(scene, delta) {
            // init x and y if necessary
            if (!this.x || this.x < 0 || this.x >scene.env.width || this.y < 0 || this.y > scene.env.height) {
                this.x = scene.env.width/2
                this.y = scene.env.height/2
            }

            if (this.dt <= 0) {
                // new time and direction
                this.dt = 1 + Math.random() * 3
                this.dx = (50 + Math.random() * 40) * (Math.random() - 0.5)
                this.dy = (50 + Math.random() * 40) * (Math.random() - 0.5)
            }

            // move point and delta time
            this.x += this.dx * delta
            this.y += this.dy * delta
            this.dt -= delta
        },

        // show the dot
        draw: function(ctx) {
            // draw dot
            ctx.fillStyle="#FF0000";
            ctx.fillRect(this.x, this.y, 3, 3); 
        }
    }

}
