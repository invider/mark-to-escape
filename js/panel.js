this['@dna/panel'] = function(_) {

	var menu = _.lib.menu([ {
		value : constants.objects.upMark,
		path : constants.path.UP_MARKERS_COUNT
	}, {
		value : constants.objects.downMark,
		path : constants.path.DOWN_MARKERS_COUNT
	}, {
		value : constants.objects.leftMark,
		path : constants.path.LEFT_MARKERS_COUNT
	}, {
		value : constants.objects.rightMark,
		path : constants.path.RIGHT_MARKERS_COUNT
	} ].map(function(i) {
		return {
			value : i.value,
			canSelect : function() {
				return _.lib.selectUtils.value(i.path)
			}
		}
	}))

	var time = 0
	return new $.sys.Frame({
		name : 'panel',

		evo : function() {
			if (scene.env.keys[constants.keyCodes.TAB]) {
				var t = new Date().getTime()
				if (t > time + 300) {
					menu.next()
					time = t
				}
			}
			_.env.player.currentMark = menu.fixSelection().selectedValue()
		},

		draw : function(ctx) {
			var items = menu.items()
			var w = 70, s = 10
			var x = (canvas.width - items.length * (w + s) + s) / 2
			var y = canvas.height - w - s
			
			ctx.lineWidth = 0.7 * s
			for ( var i in items) {
				ctx.strokeStyle = items[i].selected ? '#ff0000' : '#0000ff'
				ctx.strokeRect(x, y, w, w)
				x += w + s
			}
		}
	})
}