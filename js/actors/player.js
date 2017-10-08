
this['@dna/player'] = function(_, dat) {
	
	var dir = {
		none: { dx: 0, dy: 0, r: Math.floor, none: true },
		up: { dx: 0, dy: -1, r: Math.ceil },
		down: { dx: 0, dy: 1, r: Math.floor },
		left: { dx: -1, dy: 0, r: Math.ceil },
		right: { dx: 1, dy: 0, r: Math.floor }
	}

	var cell = (function(cx, cy) {
    	return {
    		enter: function(x, y, r) {
    			var cx2 = r(x)
    			var cy2 = r(y)
    			var dx = Math.abs(x - cx2)
    			var dy = Math.abs(y - cy2)
    			if(cx != cx2 && dx < 0.5 || cy != cy2 && dy < 0.5) {
    				cx = cx2
    				cy = cy2
    				return true;
    			}
    			return false;
    		},
            getX: function() {
                return cx
            },
            getY: function() {
                return cy
            },
    	}
    })(Math.floor(dat.x), Math.floor(dat.y))
    
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

        direction: dir.none,

        hit: function(e) {
            //console.log('hit by ' + e.name)
        },

        chooseDirection: function() {
        	switch(lastKey.value()) {
        		case constants.keyCodes.UP:
        			this.direction = dir.up
        			break;
        		case constants.keyCodes.DOWN:
        			this.direction = dir.down
        			break;
        		case constants.keyCodes.LEFT:
        			this.direction = dir.left
        			break;
        		case constants.keyCodes.RIGHT:
        			this.direction = dir.right
        			break;
            	default:
            		this.direction = dir.none
        	}
        },

        evo: function(scene, dt) {
        	var velocity = 4 * dt

        	var d = this.direction
            this.x += velocity * d.dx
            this.y += velocity * d.dy
            
            lastKey.remember()
        	if(cell.enter(this.x, this.y, d.r)) {
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
            this._.sys.spawn('dna/' + type, 'lab/camera', {
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


