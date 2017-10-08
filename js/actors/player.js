
this['@dna/player'] = function(_, dat) {
	
	var dir = {
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

        direction: dir.right,

        hit: function(e) {
            //console.log('hit by ' + e.name)
        },

        evo: function(scene, dt) {
        	var velocity = 1.5 * dt
        	var d = this.direction
            var k = scene.env.keys
            for (var k in k){
                console.log(k);
                break;
            }

            if (k[37] || k[38] || k[39] || k[40]) {
                this._x = this.x
                this.x += velocity * d.dx
                this._y = this.y
                this.y += velocity * d.dy
            }
            this.spawnMarks(k);
        	if(cell.enter(this.x, this.y, d.r)) {
                // hit a new cell - check if marker is there
        		this.x = cell.getX();
        		this.y = cell.getY();
                let markers = this._.lib.getObjectsAt(cell.getX(), cell.getY()).filter( function(e) {
                    return (e.type === 'mark')
                })
                if (markers.length > 0) {
                    console.log('found markers')
                    markers[0].hit(this)
                }
                
        		if(k[37]) {
        			this.direction = dir.left
        		} else if(k[38]) {
        			this.direction = dir.up
        		} else if(k[39]) {
        			this.direction = dir.right
        		} else if(k[40]) {
        			this.direction = dir.down
        		}
        	}
        },
        spawnMarks:function(k){
            var marks = this._.lib.getMarksAt(this.x, this.y);
            if (!marks.length){
                if (k[constants.keyCodes.SPAWN_MARK_LEFT]){
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


