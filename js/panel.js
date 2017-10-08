this['@dna/panel'] = function() {

	var menu = [
		constants.objects.upMark, 
		constants.objects.downMark,
		constants.objects.leftMark,
		constants.objects.rightMark]
	
	return new $.sys.Frame({
		name : 'panel',

		evo: function() {
			this._.env.player.currentMark = constants.objects.rightMark
			if(scene.env.keys[constants.keyCodes.TAB]) {
				
			}
		},
		
		draw : function(ctx) {
		}
	})
}