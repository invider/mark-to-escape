this['@dna/camera'] = function() {

	var viewport = { w: 10, h: 10 };
	var location = { x:0, y:0 };
	var origin = false;
	
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
		
		showOrigin: function() {
			origin = true;
			return this;
		},
		
		evo: function(scene, dt) {
			this._ls.forEach(function(e) {
				if (e.evo) e.evo(scene, dt)
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
				if (e.draw) e.draw(ctx)
			})
	   
			if(origin) {
				ctx.scale(1/scale, 1/scale);
				ctx.strokeStyle = '#ff1111';
				ctx.setLineDash([15,10])
				ctx.lineWidth = 3
				
				ctx.beginPath();
				ctx.moveTo(0, -sh);
				ctx.lineTo(0, sh);
				ctx.stroke();
				
				ctx.beginPath();
				ctx.moveTo(-sw, 0);
				ctx.lineTo(sw, 0);
				ctx.stroke();
			}
			
			ctx.restore()
		}
	})
}
