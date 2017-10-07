this['@dna/camera'] = function() {

	var viewport = { w: 10, h: 10 };
	var location = { x:0, y:0 };
	
	return new $.sys.Frame({
		name: 'camera',
		
		viewport: function(w, h) {
			viewport.w = w;
			viewport.h = h;
			return this;
		},
		
		follow: function(target) {
			location = target || { x:0, y:0 };
			return this;
		},
		
		evo: function(scene, dt) {
			this._ls.forEach(function(e) {
				e.evo(scene, dt)
			})
		},
	
		draw: function(ctx) {
			ctx.save()
			var sw = canvas.width;
			var sh = canvas.height;
			ctx.translate(sw/2, sh/2);
	   
			var scale = Math.min( sw/viewport.w, sh/viewport.h );
			ctx.scale(scale, scale);
			ctx.translate(-location.x, -location.y)
	    
			this._ls.forEach(function(e) {
				e.draw(ctx)
			})
	   
			ctx.fillStyle = '#00ff00';
			ctx.fillRect(-1,-1,2,2);
	   
			ctx.restore()
		}
	})
}