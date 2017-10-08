
this['@lab/globalCollision'] = {

    evo: function(delta) {

        this.__.camera.collide( function(target, hitter) {
            if (target.collidable) {
                target.collide(hitter)
            }
        }, '*')
    }
}

