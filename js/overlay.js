
this['@env/showOverlay'] = true

this['@lab/overlay'] = {

    init: function() {
        this.overlay = document.getElementById('overlay')
    },

    draw: function(ctx) {
        if (this._.env.showOverlay) {
            let txt = ''
            let _ = this._
            this._.log.overlay._ls.forEach(function(f) {
                txt += f(_)
            })
            this.overlay.innerHTML = txt
        } else {
            this.overlay.innerHTML = ''
        }
    }
}

_patch$overlay = {
    _$patchAt: 'log/overlay',

    status: function(_) {
        let env = _.env
        if (env.status) {
            return env.status
        } else {
            return ''
        }
    },

}

