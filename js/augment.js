
_patch$augments = {
    _$patchAt: 'aug/',

    // inject collision detection to all collidables
    collidable: function (e) {
        if (e.collidable && !e.collide) {
            e.collide = function(o) {
                if (this.x+this.w > o.x
                        && this.x < o.x+o.w
                        && this.y+this.h > o.y
                        && this.y < o.y+o.h) {
                    this.hit(o)
                }
            }
        }
    },

}
