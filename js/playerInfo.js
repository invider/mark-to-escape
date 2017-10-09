this['@dna/playerInfo'] = function() {
	
	return new $.sys.Frame({
		name: 'playerInfo',

		evo: function(scene, dt) {

		},
		txt: function(ctx, text1, text2){
            ctx.font = '32px kenney, impact, sans-serif';

            ctx.fillStyle="#202020";
            ctx.fillText(text1, 12, 37);
            ctx.fillStyle="#E08040";
            ctx.fillText(text1, 10, 35);

            ctx.fillStyle="#202020";
            ctx.fillText(text2, 12, 72);
            ctx.fillStyle="#6080D0";
            ctx.fillText(text2, 10, 70);
		},
		addVar: function(opts){
			let v = opts.value === undefined ? this._.selectOne(opts.path): opts.value;
			if (opts.number) {
				v = v || 0;
			}
            return opts.caption + v + " ";
		},
		draw: function(ctx) {
            let spawned = this._.selectOneNumber(constants.path.DUDES_SPAWNED_COUNT);
            let dead = this._.selectOneNumber(constants.path.DUDES_DEAD);
            let goal = this._.selectOneNumber(constants.path.GOAL)
            let escaped = this._.selectOneNumber(constants.path.DUDES_ESCAPED)
            let level = this._.selectOne(constants.path.PLAYER_LEVEL)
            let levelName = this._.selectOne(constants.path.LEVEL_NAME)

			let txt1 = "Level " + level + ":  " + levelName

            let txt2 = ""
            //txt += this.addVar({caption: "Alive:", value: (spawned - dead) + "/" + spawned});
            txt2 += this.addVar({caption: "Goal: ", value:  escaped + "/" + goal });
            txt2 += this.addVar({caption: " Walking: ", value:  spawned - escaped - dead });

			this.txt(ctx, txt1, txt2);
		}
	})
}
