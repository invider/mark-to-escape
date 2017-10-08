
this['@env/showDebug'] = true

this['@lab/debug'] = {

    init: function() {
        this.overlay = document.getElementById('overlay')
    },

    draw: function(ctx) {
        if (this._.env.showDebug) {
            let txt = ''
            let _ = this._
            this._.log.debugInfo._ls.forEach(function(f) {
                txt += f(_)
            })
            this.overlay.innerHTML = txt
        }
    }
}

_patch$debug = {
    _$patchAt: 'log/debugInfo',

    playerPos: function(_) {
        let target = _.lab.camera.getTarget()
        return 'player: '
            + Math.floor(target.x*10)/10
            + 'x' + Math.floor(target.y*10)/10
    },

    next: function(_) {
        let env = _.env
        return '<br>mouse: ' + env.mouseX + 'x' + env.mouseY
    },

    status: function(_) {
        let env = _.env
        if (env.status) {
            return '<br>' + env.status
        }
    },

}

