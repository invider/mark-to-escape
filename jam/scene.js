$ = scene = (function(window) {

"use strict"

// ***********
// environment

let canvas, cname, ctx

// *********
// utilities
var isObj = function(o) {
    return !!(o && typeof o === 'object')
}
var isFun = function(f) {
    return !!(f && f.constructor && f.call && f.apply);
}
var isString = function(s) {
    return toString.call(s) == "[object String]"
}
var isNumber = function(s) {
    return toString.call(s) == "[object Number]"
}
var isArray = function(a) {
    return Array.isArray(a)
}
var isMutable = function(obj) {
    return ((typeof obj === 'object')
                || (typeof obj === 'function'))
            && (!obj._locked);
}
var isFrame = function(f) {
    return !!(isObj(f) && f._frame)
}

var mix = function() {
    var arg, prop, mixin = {};
    for (arg = 0; arg < arguments.length; arg++) {
        for (prop in arguments[arg]) {
            if (arguments[arg].hasOwnProperty(prop)) {
                mixin[prop] = arguments[arg][prop];
            }
        }
    }
    return mixin;
}
var augment = function() {
    var arg;
    var prop;
    var mixin = arguments[0];
    for (arg = 1; arg < arguments.length; arg++) {
        for (prop in arguments[arg]) {
            mixin[prop] = arguments[arg][prop];
        }
    }
    return mixin;
}

var before = function(obj, fun, patch) {
    var orig = obj[fun]
    obj[fun] = function() {
        patch.apply(this, arguments)
        orig.apply(this, arguments)
    }
}

var after = function(obj, fun, patch) {
    var orig = obj[fun]
    obj[fun] = function() {
        orig.apply(this, arguments)
        patch.apply(this, arguments)
    }
}


// ******************
// system definitions
var Frame = function(initObj) {
    this._ = this
    this._ls = []
    this._dir = {}
    if (isString(initObj)) {
        this._name = initObj
    } else if (isObj(initObj)) {
        augment(this, initObj)
    }
}
Frame.prototype._frame = true
Frame.prototype.type = "frame"
Frame.prototype.attach = function(node, name) {
    if (!node) return
    if (this._locked) throw { src: this, msg: "can't attach - node is locked" }
    if (isObj(node) || isFun(node)) {
        node._ = this._
        node.__ = this
        if (name && isObj(node)) node.name = name
        if (!name && node.name) name = node.name
	}

    if (name) {
        this[name] = node
        this._dir[name] = node
    }
    this._ls.push(node)
    if (isFun(node.init)) node.init() // initialize node
    this.onAttached(node)
}
Frame.prototype.onAttached = function(node) {
    this.__.onAttached(node)
}
Frame.prototype.detach = function(node) {
	
}
Frame.prototype.apply = function(fn, predicate) {
    let i = 0
    if (isFun(predicate)) {
		this._ls.forEach( function(e) {
			if (predicate(e)) {
                fn(e)
                i++
            }
		})
    } else if (isString(predicate)) {
        let ls = this.select(predicate)
        ls.forEach( function(e) {
            fn(e)
            i++
        })
    } else {
		this._ls.forEach( function(e) {
            fn(e)
            i++
        })
    }
    return i
}
Frame.prototype.collide = function(fn, predicate) {

}
Frame.prototype.map = function(fn) {
}
Frame.prototype.flatMap = function(fn) {
}
Frame.prototype.reduce = function(fn) {
}
Frame.prototype.select = function(predicate) {
	if (isString(predicate)) {
		// select by path
		if (predicate === '') {
			// select the dir
			return this._ls.slice()
		}

		let i = predicate.indexOf('/')
		if (i > 0) {
			let nextName = predicate.substring(0, i)
			let nextPath = predicate.substring(i + 1)
			if (nextName == '..') {
				// move up
				if (!this.__) return []
				return this.__.select(nextPath)
			}

			let res = []
			for (let k in this._dir) {
				let o = this._dir[k]
				if (nextName === '*' || k.includes(nextName) || (o.tag && o.tag.includes(nextName))) {
					if (isFrame(o)) {
						res = res.concat(o.select(nextPath))
					} else if (isArray(o)) {
						if (nextPath === '' || nextPath === '*') res = res.concat(o)
						// TODO maybe handle index identifiers?
					} else if (isObj(o)) {
						for (let j in o) {
							if (nextPath === '*' || j.includes(nextPath)) {
								res.push(o[j])
							}
						}
					}
				}
				
			}
			return res

		} else if (i === 0) {
			return _scene.select(predicate.substring(1))
		} else {
			// found the point
			if (predicate === '..') {
				// move up
				if (!this.__) return []
				return this.__
			} else if (predicate === '*') return this._ls.slice()

			let res = []
			for (let k in this._dir) {
				let o = this._dir[k]
				if (k.includes(predicate) || (o.tag && o.tag.includes(predicate))) res.push(o)
			}
			return res
		}

		/*
        // switch to the next target
       return _scene.patch(nextNode, nextPath, node)
    // found the patch point - attach the node
    if (isFrame(target)) {
        if (path === '') {
            target.attach(node)
        } else {
            if (target[path]) {
                augment(target[path], node)
            } else {
                target.attach(node, path)
            }
        }
    } else if (isArray(target)) {
        target.push(node)
    } else if (isObj(target)) {
        if (path === '') throw { src: this, msg: "can't attach anonymous node to " + target }
        if (target[path]) {
            console.log('augmenting: ' + path)
            augment(target[path], node)
        } else {
            console.log('rewriting: ' + path)
            target[path] = node
        }
    }
		*/

	} else if (isFun(predicate)) {
	} else return []
}
Frame.prototype.selectOne = function(predicate) {
	let list = this.select(predicate)
	if (list.length > 0) return list[0]
	return false
}

Frame.prototype.kill = function() {
    this._ls.map(function(node) {
        if (isFun(node.kill)) node.kill()
    })
}

// Mod context container
var Mod = function(initObj) {
    Frame.call(this, initObj)
    this._$ = _scene

    // library functions
    this.attach(new Frame({
        name: "lib",
    }))
    // static environment data entities
    this.attach(new Frame({
        name: "env",
    }))
    // container for acting entities - actors, ghosts, props
    this.attach(new Frame({
        name: 'lab',
        onAttached: function(node) {
            //this._.log.debug('spawned ' + node.name)
            node.alive = true
            if (!isFun(node.draw)) node.draw = false
            if (!isFun(node.evo)) node.evo = false
            if (isFun(node.spawn)) node.spawn()
        }
    }))
}

Mod.prototype = new Frame()

Mod.prototype.init = function() {
    this.___ = this._ // save node context as parent mod
    this._ = this // must be in init, since it is assigned during the regular node.attach()
    this.attach(new Frame(this.___.sys)) // clone sys from the parent mod
    this.attach(new Frame(this.___.log)) // clone log from the parent mod
}

Mod.prototype.onAttached = function(node) {
    if (this.__) this.__.onAttached(node)
}

Mod.prototype.evolve = function(delta) {
    this.lab._ls.map( function(e) {
        if (e.evo && !e.dead && !e.paused) e.evo(_scene, delta)
    });
}

Mod.prototype.draw = function(ctx, delta) {
    // draw actors
    for (var i = 0; i < this.lab._ls.length; i++) {
        let e = this.lab._ls[i]
        if (e.draw && !e.dead && !e.hidden) {
            e.draw(ctx)
        }
    }
}



// ***********************
// scene tree construction

var _scene = new Mod()
_scene._ = _scene // set the context
_scene.__ = false // don't have any parents
_scene.___ = _scene // parent context
_scene._$ = _scene // root context

// ***
// log
_scene.attach(new Frame({
    name: 'log',
    err: function(msg, post) {
        post? console.log('! [' + msg + '] ' + post) : console.log('! ' + msg) 
        console.dir(msg)
    },
    out: function(msg, post) {
        post? console.log('> [' + msg + '] ' + post) : console.log('> ' + msg) 
    },
    debug: function(msg, post) {
        post? console.log('# [' + msg + '] ' + post) : console.log('# ' + msg) 
    },
    dump: function(obj) {
        console.dir(obj)
    },
}))

// *********
// resources
//
_scene.attach(new Frame({
    name: 'res',
    _resIncluded: 0,
    _resLoaded: 0,
}))

_scene.attach(new Frame({
    name: 'setup'
}))

// *******************
// scene manipulations

_scene.patch = function(target, path, node) {

    if (!node) throw { src: this, msg: 'node is missing for: ' + path }
    if (!isMutable(target)) throw { src: this, msg: "can't attach to imutable node @" + path }

    if (path === '') {
        // patch point is a directory - find if node is named
        if (isString(node.name)) {
            path = node.name
        }
    }

    let i = path.indexOf('/')
    if (i >= 0) {
        // switch to the next target
        let nextName = path.substring(0, i)
        let nextPath = path.substring(i + 1)
        let nextNode = target[nextName]
        if (!nextNode) {
            // provide a new one

            if (isFrame(target)) {
                nextNode = new Frame()
                target.attach(nextNode, nextName)
            } else if (isObj(target)) {
                nextNode = {}
                target[nextName] = nextNode
            } else {
                _scene.log.err('unable to patch @' + path + ' - unable to attach [' + nextName + '] to parent')
                return false
            }
        } else if (!isObj(nextNode)) {
            _scene.log.err('unable to patch @' + path + ' - [' + nextName + '] is not valid for patching')
            return false
        }
        return _scene.patch(nextNode, nextPath, node)
    }

    // found the patch point - attach the node
    if (isFrame(target)) {
        if (path === '') {
            target.attach(node)
        } else {
            if (target[path]) {
                augment(target[path], node)
            } else {
                target.attach(node, path)
            }
        }
    } else if (isArray(target)) {
        target.push(node)
    } else if (isObj(target)) {
        if (path === '') throw { src: this, msg: "can't attach anonymous node to " + target }
        if (target[path]) {
            //console.log('augmenting: ' + path)
            augment(target[path], node)
        } else {
            //console.log('rewriting: ' + path)
            target[path] = node
        }
    }

    // load resources if applicable
    if (isFun(node.load)) {
        node.load(this)
        node.load = true // replace function with true, so we'd not call it second time
    }
}

_scene.packDeclarations = function(target) {
    // normalize target
    if (!isObj(target)) target = window

    var pak = {}
    target['_def$'] = pak

    // search for declarations
    for (var key in target) {
        if (key.startsWith('_boot$') || key.startsWith('_patch$') || key.indexOf('@') >= 0) {
            pak[key] = target[key]
            target[key] = false
        } else if (key.startsWith('_setup$')) {
            let fn = target[key]
            if (isFun(fn)) {
                _scene.setup.attach(fn)
            }
        }
    }
}

_scene.scan = function(target) {
    // normalize target
    if (!isObj(target)) target = window

    // search for declarations
    for (var key in target) {
        if (key.startsWith('_boot$')) {
            let node = target[key]
            if (isFun(node)) {
                _scene.log.debug('executing: ' + key)
                node(_scene)
                target[key] = false
            }

        } else if (key.startsWith('_patch$')) {
            let node = target[key]
            if (node) {
                let path = ''
                if (node._$patchAt) {
                    path = node._$patchAt
                    if (!path.endsWith('/')) path += '/'
                }
                for (var pkey in node) {
                    if (!pkey.startsWith('_')) {
                        let fullPath = path + pkey
                        let val = node[pkey]
                        if (val) {
                            _scene.log.debug('~~ ' + fullPath + ' << ' + (val._info? val._info : val))
                            _scene.patch(_scene, fullPath, val)
                        }
                    }
                }
                target[key] = false
            }
            
        } else if (key.indexOf('@') >= 0) {
            let node = target[key]
            if (node) {
                let path = key.substring(key.indexOf('@') + 1)
                _scene.log.debug('~~ ' + path + ' << ' + (node._info? node._info : node))
                _scene.patch(_scene, path, target[key])
                target[key] = false
            }
        } else if (key.startsWith('_$') && node && isString(node._$patchAt)) {
            let path = node._$patchAt
            _scene.log.debug('~~ ' + path + ' << ' + (val._info? val._info : val))
            _scene.patch(_scene, fullPath, val)
        }
        /*
        } else if (key.startsWith('_lib$')) {
            var node = target[key]
            var name = key.substring(4, key.length)
            if (node.name !== undefined) {
                name = node.name
            }
            _scene.patch('lib', name, node)
            target[key] = "loaded"

        } else if (key.startsWith('_env$')) {
            var node = target[key]
            var name = key.substring(4, key.length)
            if (node.name !== undefined) {
                name = node.name
            }
            _scene.patch('env', name, node)
            target[key] = "loaded"

        } else if (key.startsWith('_lab$')) {
            var node = target[key]
            var name = key.substring(4, key.length)
            if (node.name !== undefined) {
                name = node.name
            }
            _scene.patch('lab', name, node)
            target[key] = "loaded"
        }
        */
    }
}

_scene.load = function(src, target, ext) {
    function onLoad() {
        _scene.res._resLoaded++
    }
    function onLoadScript(e) {
        _scene.res._resLoaded++
        _scene.log.debug('scanning: ' + src)
        _scene.scan()
    }

    // normalize target
    if (!isObj(target)) {
        target = _scene.res
    }

    // normalize extention
    if (!ext) ext = src.slice((Math.max(0, src.lastIndexOf(".")) || Infinity) + 1).toLowerCase();

    if (name === undefined) {
        name = src.replace(/^.*[\\\/]/, '')  // remove path
        name = name.replace(/\.[^/.]+$/, '') // remove extension
    }

    if (ext === 'png' || ext === 'jpeg' || ext === 'jpg') {
        _scene.log.out('loading image [' + name + ']: ' + src)
        scene.res._resIncluded ++
        var img = new Image()
        img.src = src
        img.onload = onLoad
        target[name] = img
    } else if (ext === 'ttf') {

    } else if (ext === 'wav') {

    } else if (ext === 'ogg') {

    } else if (ext === 'json') {
        // TODO how to load that? only AJAX?
    } else if (ext === 'yaml') {
        // TODO how to load that? only AJAX?
    } else if (ext === 'txt') {
        // TODO how to load that? only AJAX?
    } else if (ext === 'csv') {
        // TODO how to load that? only AJAX?
    } else if (ext === 'js') {
        src += "?" + Math.random() // fix cache issue
        _scene.log.debug('loading script: ' + src)
        scene.res._resIncluded ++
        var script = document.createElement('script');
        script.onload = onLoadScript
        script.src = src
        document.head.appendChild(script);
    }
}

  
// ********************************************
// sys functions
_scene.attach(new Frame({
    name: "sys",
}))
_scene.sys.attach(Frame)
_scene.sys.attach(mix)
_scene.sys.attach(augment)
_scene.sys.attach(before)
_scene.sys.attach(after)
_scene.sys.attach(_scene.load)

_scene.sys.attach(isObj)
_scene.sys.attach(isFun)
_scene.sys.attach(isNumber)
_scene.sys.attach(isString)
_scene.sys.attach(isArray)
_scene.sys.attach(isMutable)
_scene.sys.attach(isFrame)

_scene.env.started = false
_scene.env.TARGET_FPS = 60
_scene.env.MAX_EVO_STEP = 0.025
_scene.env.MAX_EVO_PER_CYCLE = 0.3
_scene.env.lastFrame = Date.now()
_scene.env.mouseX = 0
_scene.env.mouseY = 0
_scene.env.keys = {}  // down key set




// *****************************************************
// LIFECYCLE
// main scene lifecycle - bootstrap, cycle[evo, draw]

function bootstrap() {
    // pack existing declarations in global scope first
    _scene.packDeclarations()

    // load other parts of the framework
    _scene.load(_scene.env.basepath + 'loader.js')
    //_scene.scan()

    // load custom declarations packed before
    // TODO - maybe a better way to postpone it? scripts are loaded async
    //        so we need an event when core is loaded for that
    _scene.scan(window._def$)
    
    // binding to the graphical context by convention
    canvas = document.getElementById("canvas")
    if (canvas == null) {
        // precreated canvas is not found, so create one
        canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.style.zIndex   = 1;
        canvas.style.border   = "0px";
        canvas.style.margin = "0px";
        canvas.style.padding = "0px";
        canvas.style.position = "absolute";
        canvas.style.display = "block";
        document.body.appendChild(canvas);
        cname = "canvas"

        // setup body
        document.body.style.margin = "0"
        document.body.style.padding = "0"
    } else {
        cname = "canvas"
    }
    ctx = canvas.getContext("2d")
    
    //canvas.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); //Chrome
    //canvas.mozRequestFullScreen(); //Firefox
    //canvas.msRequestFullscreen();
    //canvas.requestFullscreen();

    expandCanvas()

    // initiate the game loop
    window.requestAnimFrame(cycle)
    /*
    // old-fasioned way to setup animation
    if (_scene.env.TARGET_FPS <= 0) {
        setInterval(cycle, 1)
    } else {
        setInterval(cycle, 1000/_scene.env.TARGET_FPS)
    }
    */
}

// > implement 'keepOriginalAspectRatio'&'aspectRatio' option
function expandCanvas() {
    var canvas = document.getElementById(cname)
    var newWidth = window.innerWidth
    var newHeight = window.innerHeight
    _scene.env.width = ctx.width = canvas.width = newWidth
    _scene.env.height = ctx.height = canvas.height = newHeight
    canvas.style.width = newWidth + 'px'
    canvas.style.height = newHeight + 'px'
    _scene.draw(ctx, 0) // it doesn't work without forced redraw
}



// ******************************************************
function cycle() {
    var now = Date.now()
    var delta = (now - _scene.env.lastFrame)/1000

    // loading/setup actions
    // TODO make loading screen mod possible
    if (!_scene.env.started) {
        try {
            if (_scene.res._resIncluded > _scene.res._resLoaded) {
                // wait more
            }  else {
                // OK - everything is loaded, call setup functions
                _scene.setup._ls.forEach(function(f) {
                    f(_scene)
                })
                _scene.env.started = true
            }
            window.requestAnimFrame(cycle)
        } catch (e) {
            _scene.log.err(e)
        }
        return
    }

    // show, react and update cycle
    _scene.draw(ctx, delta)

    // max evolution threshold
    if (delta > _scene.env.MAX_EVO_PER_CYCLE) {
        delta = _scene.env.MAX_EVO_PER_CYCLE
    }

    // evolve multiple times in small quants
    // to compensate possible lag due to rendering delays
    while(delta > 0) {
        if (delta > _scene.env.MAX_EVO_STEP) {
            _scene.evolve(scene.env.MAX_EVO_STEP);
        } else {
            _scene.evolve(delta);
        }
        delta -= _scene.env.MAX_EVO_STEP
    }
    _scene.env.lastFrame = now
	window.requestAnimFrame(cycle)
}



// ***************
// events handling
//

function handleMouseMove(e) {
    e = e || window.event
    _scene.env.mouseX = e.pageX
    _scene.env.mouseY = e.pageY
    e.preventDefault()
    e.stopPropagation()
    return false;
}

function handleMouseDown(e) {
    switch (e.button) {
    case 0: 
            break;
    case 1:
            break;
    case 2:
            break;
    }
    e.preventDefault()
    e.stopPropagatton = e.button
    return false;
}

function handleMouseClick(e) {
}

function handleMouseUp(e) {
}

function handleMouseDoubleClick(e) {
    switch (e.button) {
    case 0: 
            break;
    case 1:
            break;
    case 2:
            break;
    }
    e.preventDefault()
    e.stopPropagatton = e.button
    return false;
}

function handleMouseOut(e) {
    for (var k in _scene.env.keys) {
        delete _scene.env.keys[k]
    }
}

function handleContextMenu() {
    return false;
}

function handleKeyDown(e) {
    var code = e.which || e.keyCode

    _scene.env.keys[code] = 1

    e.preventDefault()
    e.stopPropagation()
    return false;
}

function handleKeyUp(e) {
    var code = e.which || e.keyCode
    delete _scene.env.keys[code]

    e.preventDefault()
    e.stopPropagation()
    return false;
}


// *****************
// setup environment

// determine base path
let scripts = document.getElementsByTagName('script')
let path = scripts[scripts.length-1].src.split('?')[0]
let basepath = path.split('/').slice(0, -1).join('/')+'/'
let htmlpath = location.href.split('/').slice(0, -1).join('/')+'/'
if (basepath.startsWith(htmlpath)) {
    // we can shorten the basepath to a relative value
    basepath = basepath.substring(htmlpath.length)
}
_scene.env.basepath = basepath


// bind events to window
window.addEventListener('resize', expandCanvas, false)
window.onload = bootstrap
window.onmousedown = handleMouseDown
window.onmouseup = handleMouseUp
window.onclick = handleMouseClick
window.onmouseout = handleMouseOut
window.ondblclick = handleMouseDoubleClick
window.oncontextmenu = handleContextMenu
window.onmousemove = handleMouseMove
window.onkeydown = handleKeyDown
window.onkeyup = handleKeyUp
// extend window with universal requestAnimFrame
window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(callback, element) {
            window.setTimeout(callback, 1000/60);
         };
})();


return _scene;

}(this))
