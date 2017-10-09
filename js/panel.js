this['@dna/panel'] = function(_) {

	var menu = _.lib.menu([ {
		img: _.res.up_mark,
		value : constants.objects.upMark,
		path : constants.path.UP_MARKERS_COUNT,
        info: 'Mark Up',
	}, {
		img: _.res.down_mark,
		value : constants.objects.downMark,
		path : constants.path.DOWN_MARKERS_COUNT,
        info: 'Mark Down',
	}, {
		img: _.res.left_mark,
		value : constants.objects.leftMark,
		path : constants.path.LEFT_MARKERS_COUNT,
        info: 'Mark Left',
	}, {
		img: _.res.right_mark,
		value : constants.objects.rightMark,
		path : constants.path.RIGHT_MARKERS_COUNT,
        info: 'Mark Right',
	}, {
		img: _.res.speedupMark,
		value : constants.objects.speedUpMark,
		path : constants.path.SPEED_UP_MARKERS_COUNT,
        info: 'Mark Speed Up',
	},
	{
		img: _.res.removeMark,
		value : constants.objects.removeMark,
		path : constants.path.REMOVE_MARKERS_COUNT,
        info: 'Remove Mark',
	},
	{
		img: _.res.restartMark,
		value : constants.objects.restartMark,
		path : constants.path.RESTART_MARKERS_COUNT,
        info: 'Restart Level',
	}
        ].map(function(i) {
		return {
			img: i.img,
			value: i.value,
            info: i.info,
			canSelect: function() {
				return _.lib.selectUtils.value(i.path)
			},
		}
	}))

	var time = 0
	return new $.sys.Frame({
		name : 'panel',

		evo : function() {
			if (scene.env.keys[constants.keyCodes.TAB]
			    || scene.env.keys[constants.keyCodes.SHIFT]) {
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
			var y = canvas.height - w - s - 35

			for ( var i in items) {
				var v = items[i];
				ctx.fillStyle = v.selected ? '#d0ff40' : v.canSelect() ? '#6040d0' : 'grey'
				ctx.fillRect(x, y, w, w)

                let z = 4
                let z2 = z * 2
				ctx.fillStyle = '#8090d0'
				ctx.fillRect(x+is/2-z, y+is/2-z, w-is+z2, w-is+z2)
                ctx.imageSmoothingEnabled = false
				ctx.drawImage(items[i].img, x + is/2, y + is/2, w - is, w - is);
				x += w + s

                if (v.selected) {
                    // put in status
                    if (v.value === constants.objects.restartMark) {
                        this._.env.status = v.info
                    } else {
                        this._.env.status = v.canSelect() + ' ' + v.info
                    }
                }
			}
		}
	})
}
