this['@dna/camera'] = function() {

	return new $.sys.Frame({
		name: 'camera',
		
		evo: function(scene, dt) {
			this._ls.forEach(function(e) {
				e.evo(scene, dt)
			})
		},
	
		draw: function(ctx) {
			ctx.save()
			ctx.translate(canvas.width/2, canvas.height/2)
	   
			if(this.scale) {
				ctx.scale(this.scale, this.scale)
			}
	   
			var target = this.target
			if(target && target.x && target.y) {
				ctx.translate(-target.x, -target.y)
			}
	    
			this._ls.forEach(function(e) {
				e.draw(ctx)
			})
	   
			ctx.fillStyle = '#00ff00';
			ctx.fillRect(-1,-1,2,2);
	   
			ctx.restore()
		}
	})
}