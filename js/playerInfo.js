this['@dna/playerInfo'] = function() {
	
	return new $.sys.Frame({
		name: 'playerInfo',

		evo: function(scene, dt) {

		},
		txt: function(ctx, text){
            ctx.font = '48px serif';
            ctx.fillStyle="#FF0000";
            ctx.fillText(text, 10, 50);
		},
		addVar: function(opts){
			let v = this._.selectOne(opts.path);
			if (opts.number) {
				v = v || 0;
			}
            return opts.caption + v + " ";
		},
		draw: function(ctx) {
			let txt = "";
            txt += this.addVar({caption: "RM:", path: "env/player/markers/right", number: 1});
            txt += this.addVar({caption: "LM:", path: "env/player/markers/left", number: 1});
            txt += this.addVar({caption: "DM:", path: "env/player/markers/down", number: 1});
            txt += this.addVar({caption: "UM:", path: "env/player/markers/up", number: 1});
            txt += this.addVar({caption: "Alive:", path: "env/player/dudesSpawned", number: 1});


			// "env/player/markers/right=3\n"+
            // "env/player/markers/down=2\n"+
            // "env/player/markers/up=1\n"+
            // "env/player/goal=10\n"+
			this.txt(ctx, txt);
		}
	})
}
