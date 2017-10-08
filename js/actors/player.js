
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
    		}
    	}
    })(Math.floor(dat.x), Math.floor(dat.y))
	
    // generate unique id
    if (!this._serial) this._serial = 1;
    else this._serial++;

    return {
        name: 'player_' + this._serial,
        // state
        x: dat.x,
        y: dat.y,
        direction: dir.right,

        evo: function(scene, dt) {
        	var velocity = 0.8 * dt
        	var d = this.direction
        	this.x += velocity * d.dx
        	this.y += velocity * d.dy
        	if(cell.enter(this.x, this.y, d.r)) {
        		var k = scene.env.keys
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


