
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
    }

};
