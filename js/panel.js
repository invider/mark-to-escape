this['@dna/panel'] = function(_) {

	var items = [
		{
			value: constants.objects.upMark,
			path: constants.path.UP_MARKERS_COUNT
		}, 
		{
			value: constants.objects.downMark,
			path: constants.path.DOWN_MARKERS_COUNT
		},
		{
			value: constants.objects.leftMark,
			path: constants.path.LEFT_MARKERS_COUNT
		},
		{
			value: constants.objects.rightMark,
			path: constants.path.RIGHT_MARKERS_COUNT
		}]
	
	var menu = (function(items) {
		var curr = items[0]
		for(var i = items.length; i-- > 0; ) {
			items[i].next = curr
			curr = items[i]
			curr.available = (function(path) {
				return function() {
					return _.lib.selectUtils.check(path)	
				}
			})(curr.path)
		}
		return {
			next: function() {
				for(var i = curr.next; i != curr; i = i.next) {
					console.log(i)
					if(i.available()) {
						break;
					}
				}
				return this
			},
			
			selection: function() {
				return curr.available() ? curr.value : undefined
			},
			
			items: function() {
				return items
			}
		}.next()
	})(items)
	
	
	return new $.sys.Frame({
		name : 'panel',

		evo: function() {
			if(scene.env.keys[constants.keyCodes.TAB]) {
				this._.env.player.currentMark = menu.next().selection();
			}
		},
		
		draw : function(ctx) {
			for(var i in menu.items()) {
				
			}
		}
	})
}