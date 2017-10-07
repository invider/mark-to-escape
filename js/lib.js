
_patch$gamelib = {
    _$patchAt: 'lib/',

    getSolid: function(x, y) {
        x = Math.floor(x)
        y = Math.floor(y)

        let solid
        this._.lab.camera._ls.forEach(function(e) {
            if (e.alive && e.solid
                    && Math.floor(e.x) === x
                    && Math.floor(e.y) === y) {
                solid = e
            }
        })
        return solid
    },

    isFree: function(x, y) {
        let solid = this.getSolid(x, y)
        return !solid
    },

}
