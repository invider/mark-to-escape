
this['@dna/dude'] = function(_, dat) {
    // generate unique id
    if (!this._serial) this._serial = 1;
    else this._serial++;
    
    var cell = _.lib.cell(dat.x, dat.y)

    return {
        type: 'dude',
        name: 'dude_' + this._serial,
        //markable: true,
        //collidable: true,
        // state
        x: dat.x,
        y: dat.y,
        w: 1,
        h: 1,
        speed: 1,
        direction: dat.direction,

        spawn: function() {
            this._.lib.sfx('spawned', 0.5)
        },

        finish: function() {
            this._.lib.sfx('killed', 0.5)
        },

        hit: function(e) {
        },

        evo: function (scene, delta) {
        	this.x += delta * this.speed * this.direction.dx
        	this.y += delta * this.speed * this.direction.dy
        	
        	if(cell.enter(this)) {
        		var tiles = this._.lib.getTilesAt(this.x, this.y)
        		if(tiles.length > 0) {
        			tiles[0].stepOver(this)
        		}
        		
        		this.fixDirection()
        	}
        },

        draw: function(ctx) {
            let hw = this.w/2
            let hh = this.h/2

            ctx.save()
            ctx.imageSmoothingEnabled = false
			ctx.translate(this.x+hw, this.y+hh);

            switch (this.direction) {
                case constants.dir.RIGHT: ctx.rotate(Math.PI/2); break;
                case constants.dir.LEFT: ctx.rotate(Math.PI+Math.PI/2); break;
                case constants.dir.DOWN: ctx.rotate(Math.PI); break;
            }

            ctx.drawImage(this._.res.player, -hw, -hh, 1, 1);
            ctx.restore()
        },

        fixDirection: function() {
            if (!this.checkTargetCellFree()) {
                this.inverse()
                if(!this.checkTargetCellFree()) {
                	this.rotate()
                    if(!this.checkTargetCellFree()) {
                    	this.inverse()
                    	if(!this.checkTargetCellFree()) {
                    		this.direction = constants.dir.NONE
                    	}
                    }
                }
            }
        },
        
        checkTargetCellFree: function() {
            return this._.lib.isFree(cell.getX() + this.direction.dx, cell.getY() + this.direction.dy)
        },

        inverse: function() {
            switch(this.direction){
                case constants.dir.UP:
                    this.direction = constants.dir.DOWN
                    break;
                case constants.dir.DOWN:
                    this.direction = constants.dir.UP
                    break;
                case constants.dir.LEFT:
                    this.direction = constants.dir.RIGHT
                    break;
                case constants.dir.RIGHT:
                    this.direction = constants.dir.LEFT
                    break;
            }
        },
        
        rotate: function() {
            switch(this.direction){
            	case constants.dir.UP:
            		this.direction = constants.dir.LEFT
            		break;
            	case constants.dir.LEFT:
            		this.direction = constants.dir.DOWN
            		break;
            	case constants.dir.DOWN:
            		this.direction = constants.dir.RIGHT
            		break;
            	case constants.dir.RIGHT:
            		this.direction = constants.dir.UP
            		break;
            }
        }
    }
};
