
_patch$augments = {
    _$patchAt: 'aug/',

    collidable: function (e) {
        if (e.collidable) {
            e.collide = function(o) {
                if (e.x+e.w > o.x
                        && e.x < o.x+o.w
                        && e.y+e.h > o.y
                        && e.y < o.y+o.h) {
                    e.hit(o)
                }

            }
        }
    }

}
