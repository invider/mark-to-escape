_patch$gameLibselectUtils = {
    _$patchAt: 'lib/selectUtils',
    inc: function(path){
        let val = this._.selectOneNumber(path);
        this._.patch(this._, path, val + 1);
        return val + 1;
    },
    dec: function(path){
        let val = this._.selectOneNumber(path);
        this._.patch(this._, path, val - 1);
        return val - 1;
    },
    value: function(path) {
    	return this._.selectOneNumber(path);
    },
    checkAndDec: function(path){
        let val = this._.selectOneNumber(path);
        if (val){
            this._.patch(this._, path, val - 1);
        }
        return val;
    },
    detachObj: function(obj){
        obj.__.detach(obj);
    },
    nullifyPaths: function(paths, value){
        var my = this;
        paths.forEach(function(path){
            my._.patch(my._, path, value);
        });
    }
};

_patch$gamelib = {
    _$patchAt: 'lib/',

    getSolid: function(x, y) {
        x = Math.floor(x);
        y = Math.floor(y);

        let solid;
        this._.lab.camera.tiles._ls.forEach(function(e) {
            if (e.alive && e.solid
                    && Math.floor(e.x) === x
                    && Math.floor(e.y) === y) {
                solid = e;
            }
        });
        return solid;
    },

    isFree: function(x, y) {
        let solid = this.getSolid(x, y);
        return !solid
    },

    getObjectsAt: function(x, y){
        x = Math.floor(x);
        y = Math.floor(y);
        let lists = this._.lab.camera._ls.concat(
            this._.lab.camera.tiles._ls
        ).concat(this._.lab.camera.dudes._ls)
        return lists.filter(e => e.alive && Math.floor(e.x) === x && Math.floor(e.y) === y );
    },

    getTilesAt: function(x, y) {
        return this.getObjectsAt(x, y).filter(o => o.stepOver);
    },
    
    getMarksAt: function(x, y){
        return this.getObjectsAt(x, y).filter(o => o.type === constants.types.MARK);
    },
    
    cell: function(cx, cy) {
    	cx = Math.floor(cx)
    	cy = Math.floor(cy)
    	return {
    		enter: function(p) {
    			var cx2 = p.direction.r(p.x)
    			var cy2 = p.direction.r(p.y)
    			var dx = Math.abs(p.x - cx2)
    			var dy = Math.abs(p.y - cy2)
    			if(cx != cx2 && dx < 0.5 || cy != cy2 && dy < 0.5) {
    				p.x = cx2
    				p.y = cy2
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
    },
    
    menu: function(items, empty) {
    	var curr = items[0], empty = empty || {}
		for (var i = items.length; i-- > 0;) {
			items[i].next = curr
			curr = items[i]
		}
		return {
			next : function() {
				curr.selected = false
				for (var i = curr.next; i != curr; i = i.next) {
					if (i.canSelect()) {
						curr = i
						break;
					}
				}
				curr.selected = curr.canSelect()
				return this
			},
			
			fixSelection: function() {
				curr.selected = true
				return curr.canSelect() ? this : this.next()
			},

			selectedValue : function() {
				return curr.selected ? curr.value : empty
			},

			items : function() {
				return items
			}
		}.fixSelection()
    },

    sfx: function(sampleName, volume) {
        let sample = this._.res.sfx[sampleName]
        if (!sample) {
            this._.log.err("can't find sfx to play: " + sampleName)
            return
        }
        if (!volume) volume = 1

        sample.volume = volume
        sample.play()
    },

};
