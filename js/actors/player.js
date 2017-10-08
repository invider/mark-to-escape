
this['@dna/player'] = function(_, dat) {

	var cell = _.lib.cell(Math.floor(dat.x), Math.floor(dat.y))
    
    var lastKey = (function(key) {
    	var keys = [
    		constants.keyCodes.SPAWN_MARK_UP, 
    		constants.keyCodes.SPAWN_MARK_DOWN,
    		constants.keyCodes.SPAWN_MARK_LEFT, 
    		constants.keyCodes.SPAWN_MARK_RIGHT,
    		constants.keyCodes.LEFT, 
    		constants.keyCodes.UP, 
    		constants.keyCodes.RIGHT, 
    		constants.keyCodes.DOWN]
    	return {
    		remember: function() {
    			var k = scene.env.keys
    			for(var i in keys) {
    				if(k[keys[i]]) {
    					key = keys[i]
    					return
    				}
    			}
    			key = 0
    		},
    		value: function() {
    			return key
    		}
    	}
    })(0)

    // generate unique id
    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        type: 'player',
        name: 'player_' + this._serial,
        collidable: true,
        markable: true,

        // state
        x: dat.x,
        y: dat.y,
        w: 1,
        h: 1,

        direction: constants.dir.NONE,

        hit: function(e) {
            //console.log('hit by ' + e.name)
        },

        chooseDirection: function() {
        	switch(lastKey.value()) {
        		case constants.keyCodes.UP:
        			this.direction = constants.dir.UP
        			break;
        		case constants.keyCodes.DOWN:
        			this.direction = constants.dir.DOWN
        			break;
        		case constants.keyCodes.LEFT:
        			this.direction = constants.dir.LEFT
        			break;
        		case constants.keyCodes.RIGHT:
        			this.direction = constants.dir.RIGHT
        			break;
            	default:
            		this.direction = constants.dir.NONE
        	}
            if (!this._.lib.isFree(
                        cell.getX() + this.direction.dx,
                        cell.getY() + this.direction.dy)) {
                    this.direction = constants.dir.NONE
            }
        },

        evo: function(scene, dt) {
        	var velocity = 4 * dt

        	var d = this.direction
            this.x += velocity * d.dx
            this.y += velocity * d.dy
            
            lastKey.remember()
        	if(cell.enter(this.x, this.y, d)) {
                // hit a new cell - check if marker is there
        		this.x = cell.getX();
        		this.y = cell.getY();

                // hit a new cell - check if marker is there
                let markers = this._.lib.getObjectsAt(cell.getX(), cell.getY()).filter( function(e) {
                    return (e.type === 'mark')
                })
                if (markers.length > 0) {
                    console.log('found markers')
                    markers[0].hit(this)
                }

                this.chooseDirection()
                this.spawnMarks();
        	} else if(d.none) {
        		this.chooseDirection()
                this.spawnMarks();
        	}
        },
        spawnMarks:function(){
            let marks = this._.lib.getMarksAt(this.x, this.y);
            if (!marks.length){
                if (lastKey.value() == constants.keyCodes.SPAWN_MARK_LEFT){
                    this.spawnMark(this.x, this.y, constants.objects.leftMark);
                }
            }
        },
        spawnMark: function(x, y, type){
            console.log("spawning mark:" + type);
            this._.sys.spawn(type, constants.layers.TILES, {
                x: x,
                y: y,
            });
        },
        // show the dot
        draw: function(ctx) {
        	var x = this.x
        	var y = this.y
            var d = this.direction
            
            /*
            // draw dot
            ctx.fillStyle="#FF1111";
            ctx.fillRect(x, y, 1, 1);
            
            ctx.fillStyle = 'green'
            ctx.beginPath()
            ctx.moveTo(x + 0.5, y + 0.5)
            ctx.lineTo(x + (1 + d.dx - d.dy) / 2, y + (1 + d.dy + d.dx) / 2)
            ctx.lineTo(x + (1 + d.dx + d.dy) / 2, y + (1 + d.dy - d.dx) / 2)
            ctx.closePath()
            ctx.fill()
            */
            ctx.imageSmoothingEnabled = false
            ctx.drawImage(this._.res.player, this.x, this.y, 1, 1);
        }
    }

}


