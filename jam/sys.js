
this['core@sys'] = (function(window) {
    
return {
    _info: 'system functions',
    cp: function(_, source, target) {
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

        if (!_.sys.isFrame(dest)) return false
        list.forEach( function(e) {
            dest.attach(e)
        })
        return list.length
    },
}

})(this)
