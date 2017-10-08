this['@dna/panel'] = function(_) {

	var menu = _.lib.menu([ {
		img: _.res.up_mark,
		value : constants.objects.upMark,
		path : constants.path.UP_MARKERS_COUNT
	}, {
		img: _.res.down_mark,
		value : constants.objects.downMark,
		path : constants.path.DOWN_MARKERS_COUNT
	}, {
		img: _.res.left_mark,
		value : constants.objects.leftMark,
		path : constants.path.LEFT_MARKERS_COUNT
	}, {
		img: _.res.right_mark,
		value : constants.objects.rightMark,
		path : constants.path.RIGHT_MARKERS_COUNT
	}, {
		img: _.res.speedupMark,
		value : constants.objects.speedUpMark,
		path : constants.path.SPEED_UP_MARKERS_COUNT
	} ].map(function(i) {
		return {
			img: i.img,
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
			var w = 70, s = 10, is = 2 * s
			var x = (canvas.width - items.length * (w + s) + s) / 2
			var y = canvas.height - w - s

			for ( var i in items) {
				var v = items[i];
				ctx.fillStyle = v.selected ? '#ff0000' : v.canSelect() ? '#0000ff' : 'grey'
				ctx.fillRect(x, y, w, w)
				ctx.drawImage(items[i].img, x + is/2, y + is/2, w - is, w - is);
				x += w + s
			}
		}
	})
}