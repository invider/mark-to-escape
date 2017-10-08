_patch$gameLibselectUtils = {
    _$patchAt: 'lib/selectUtils',
    inc: function(path){
        let val = this._.selectOneNumber(path);
        this._.patch(this._, path, val + 1);
        return val;
    },
    dec: function(path){
        let val = this._.selectOneNumber(path);
        this._.patch(this._, path, val - 1);
        return val;
    },
    checkAndDec: function(path){
        let val = this._.selectOneNumber(path);
        if (val){
            this._.patch(this._, path, val - 1);
        }
        return val;
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

    getObjectsAt: function(x, y, opts){
        opts = opts || {};

        x = Math.floor(x);
        y = Math.floor(y);
        let lists = this._.lab.camera._ls.concat(
            this._.lab.camera.tiles._ls
        ).concat(this._.lab.camera.dudes._ls)
        return lists.filter(e => e.alive && Math.floor(e.x) === x && Math.floor(e.y) === y );
    },
    getMarksAt: function(x, y){
        return this.getObjectsAt(x, y).filter(o => o.type === constants.types.MARK);
    },
    cell: function(cx, cy) {
    	return {
    		enter: function(x, y, dir) {
    			var cx2 = dir.r(x)
    			var cy2 = dir.r(y)
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
    }

};
