this['@dna/panel'] = function(_) {
	
	var menu = (function(items) {
		var curr = items[0], empty = {}
		for (var i = items.length; i-- > 0;) {
			items[i].next = curr
			curr = items[i]
		}
		return {
			next : function() {
				curr.selected = false
				for (var i = curr.next; i != curr; i = i.next) {
					if (i.canSelect()) {
						curr = i
						break;
					}
				}
				curr.selected = curr.canSelect()
				return this
			},
			
			adjust: function() {
				return curr.canSelect() ? this : this.next()
			},

			selection : function() {
				return curr.canSelect() ? curr.value : empty
			},

			items : function() {
				return items
			}
		}.next()
	})([ 
		{
			value : constants.objects.upMark,
			path: constants.path.UP_MARKERS_COUNT
		}, {
			value : constants.objects.downMark,
			path: constants.path.DOWN_MARKERS_COUNT
		}, {
			value : constants.objects.leftMark,
			path: constants.path.LEFT_MARKERS_COUNT
		}, {
			value : constants.objects.rightMark,
			path: constants.path.RIGHT_MARKERS_COUNT
		} ].map(function(i) {
			return {
				value: i.value,
				canSelect: function() {
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
				if(t > time + 300) {
					menu.next()
					time = t
				}
			}
			_.env.player.currentMark = menu.adjust().selection()
		},

		draw : function(ctx) {
			var w = 50, s = 5
			var x = s
			var y = canvas.height - w - s
			var items = menu.items()
			for ( var i in items) {
				ctx.strokeStyle = items[i].selected ? '#ff0000' : '#0000ff'
				ctx.lineWidth = 3
				ctx.beginPath()
				ctx.moveTo(x, y)
				ctx.lineTo(x + w, y)
				ctx.lineTo(x + w, y + w)
				ctx.lineTo(x, y + w)
				ctx.closePath()
				ctx.stroke()
				x += w + s
			}
		}
	})
}