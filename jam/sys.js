
this['core@sys'] = (function(window) {
    
return {
    _info: 'system functions',
    cp: function(source, target) {
        this._.log.debug('copying ' + source + ' -> ' + target)

        let list = this._.select(source)
        if (list.length === 0) return false
        let dest 
        if (this._.sys.isString(target)) {
            dest = this._.select(target)
            if (dest.length !== 1) return false // can't copy if no node or more than one found
            dest = dest[0]
        } else {
            dest = target
        }

        if (!this._.sys.isFrame(dest)) return false
        list.forEach( function(e) {
            dest.attach(e)
        })
        return list.length
    },
    spawn: function(source, target) {
        this._.log.debug('spawning ' + source + ' -> ' + target)

        let cons = this._.selectOne(source)
        if (!cons) return false

        let dest 
        if (this._.sys.isString(target)) {
            dest = this._.selectOne(target)
            if (!dest) return false // can't copy if no node or more than one found
        } else {
            dest = target
        }

        if (!this._.sys.isFrame(dest)) return false
        if (!this._.sys.isFun(cons)) return false

        let res = cons()
        dest.attach(res)
        return res
    }
}

})(this)
