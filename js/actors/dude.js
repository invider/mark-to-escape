
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

        hit: function(e) {
        },

        evo: function (scene, delta) {
        	this.x += delta * this.speed * this.direction.dx
        	this.y += delta * this.speed * this.direction.dy
        	
        	if(cell.enter(this.x, this.y, this.direction)) {
        		this.x = cell.getX()
        		this.y = cell.getY()
        		
        		var markers = this._.lib.getMarksAt(cell.getX(), cell.getY())
        		if(markers.length > 0) {
        			markers[0].applyMarker(this)
        		}
        		
        		this.fixDirection()
        	}
        },

        draw: function(ctx) {
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(this._.res.player, this.x, this.y, 1, 1);
        },

        fixDirection: function() {
            if (!this.checkTargetCellFree()) {
                this.inverse()
                if(!this.checkTargetCellFree()) {
                	this.rotate()
                    if(!this.checkTargetCellFree()) {
                    	this.inverse()
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
