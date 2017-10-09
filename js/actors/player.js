this['@dna/player'] = function(_, dat) {

	var cell = _.lib.cell(dat.x, dat.y)
    
    var lastKey = (function(key) {
    	var keys = [
    		constants.keyCodes.SPACE,
    		constants.keyCodes.ENTER,
            constants.keyCodes.NEXT_LEVEL,
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

    return {
        type: 'player',
        name: 'player',
        collidable: true,
        markable: true,

        // state
        x: dat.x,
        y: dat.y,
        w: 1,
        h: 1,

        // animation
        animFrame: 0,
        animState: 0,
        animStart: 0,
        animEnd: 7,
        animSpeed: 0.2,


        direction: constants.dir.NONE,

        spawn: function() {
            this.img = this._.res.player
        },

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
        },
        
        fixDirection: function() {
        	if (!this._.lib.isFree(
                    cell.getX() + this.direction.dx,
                    cell.getY() + this.direction.dy)) {
                this.direction = constants.dir.NONE
        	}
        },

        anim: function(delta) {
            // adjust animation
            this.animState += delta
            if (this.animState >= this.animSpeed) {
                // next frame
                this.animFrame ++
                this.animState -= this.animSpeed
                if (this.animFrame > this.animEnd) this.animFrame = this.animStart
            }
        },

        evo: function(scene, dt) {
            this.anim(dt)
        	var velocity = 4
            this._x = this.x
            this.x += velocity * dt * this.direction.dx
            this._y = this.y
            this.y += velocity * dt * this.direction.dy
            
            lastKey.remember()
        	if(cell.enter(this) || this.direction.none) {
                this.chooseDirection()
                this.fixDirection()
                this.spawnMarks()

                if (this.direction.none) {
                    this.animEnd = 0
                } else {
                    this.animEnd = 7
                }
        	}
        },
        spawnMarks:function(){
            var toSpawn = false, toCheck = false;
            if(scene.env.keys[constants.keyCodes.NEXT_LEVEL]) {
                this._.lib.spawnNextLevel();
                delete scene.env.keys[constants.keyCodes.NEXT_LEVEL];
            } else if(lastKey.value() == constants.keyCodes.SPACE
                    || lastKey.value() == constants.keyCodes.ENTER) {
            	toSpawn = this._.env.player.currentMark;
            	if(toSpawn == constants.objects.leftMark) {
            		toCheck = constants.path.LEFT_MARKERS_COUNT;
            	} else if(toSpawn == constants.objects.rightMark) {
            		toCheck = constants.path.RIGHT_MARKERS_COUNT;
            	} else if(toSpawn == constants.objects.upMark) {
            		toCheck = constants.path.UP_MARKERS_COUNT;
            	} else if(toSpawn == constants.objects.downMark) {
            		toCheck = constants.path.DOWN_MARKERS_COUNT;
            	} else if(toSpawn == constants.objects.speedUpMark) {
            		toCheck = constants.path.SPEED_UP_MARKERS_COUNT;
            	}
                delete scene.env.keys[constants.keyCodes.SPACE];
            }
    
            if (toSpawn){
                if (toSpawn === constants.objects.restartMark){
                    this._.lib.restartLevel();
                } else if (toSpawn === constants.objects.removeMark){
                    let mark = this.removeMarksAt(this.x, this.y);
                } else if (this._.selectOneNumber(toCheck)){
                    if (this.spawnMark(this.x, this.y, toSpawn)){
                        this._.lib.selectUtils.dec(toCheck);
                    }
                }
            }
        },
        
        spawnMark: function(x, y, type){
            let marks = this._.lib.getMarksAt(this.x, this.y);
            if (!marks.length) {
                console.log("spawning mark:" + type);
                this._.sys.spawn(type, constants.layers.TILES, {
                    x: x,
                    y: y,
                });
                return true;
            }
            return false;
        },
        removeMarksAt: function(x, y){
            let marks = this._.lib.getMarksAt(this.x, this.y);
            if (marks.length) {
                this._.lib.selectUtils.detachObj(marks[0]);
                return true;
            }
            return false;
        },

        draw: function(ctx) {
            let hw = this.w/2
            let hh = this.h/2

            ctx.save()
            ctx.imageSmoothingEnabled = false
			ctx.translate(this.x+hw, this.y+hh);

            if (!this.direction.none) this._direction = this.direction
            switch (this._direction) {
                case constants.dir.UP: break;
                case constants.dir.RIGHT: ctx.rotate(Math.PI/2); break;
                case constants.dir.LEFT: ctx.rotate(Math.PI+Math.PI/2); break;
                case constants.dir.DOWN: ctx.rotate(Math.PI); break;
            }

            ctx.drawImage(this.img[this.animFrame], -hw, -hh, 1, 1);
            ctx.restore()
        }
    }

}


