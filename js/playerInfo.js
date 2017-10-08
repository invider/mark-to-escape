this['@dna/playerInfo'] = function() {
	
	return new $.sys.Frame({
		name: 'playerInfo',

		evo: function(scene, dt) {

		},
		txt: function(ctx, text, levelInfo){
            ctx.font = '48px zekton, impact, sans-serif';
            ctx.fillStyle="#FF0000";
            ctx.fillText(levelInfo, 10, 50);
            ctx.fillText(text, 10, 90);
		},
		addVar: function(opts){
			let v = opts.value === undefined ? this._.selectOne(opts.path): opts.value;
			if (opts.number) {
				v = v || 0;
			}
            return opts.caption + v + " ";
		},
		draw: function(ctx) {
			let txt = "";
            txt += this.addVar({caption: "RM:", path: constants.path.RIGHT_MARKERS_COUNT, number: 1});
            txt += this.addVar({caption: "LM:", path: constants.path.LEFT_MARKERS_COUNT, number: 1});
            txt += this.addVar({caption: "DM:", path: constants.path.DOWN_MARKERS_COUNT, number: 1});
            txt += this.addVar({caption: "UM:", path: constants.path.UP_MARKERS_COUNT, number: 1});
            var spawned = this._.selectOneNumber(constants.path.DUDES_SPAWNED_COUNT);
            var dead = this._.selectOneNumber(constants.path.DUDES_DEAD);
            txt += this.addVar({caption: "Alive:", value: (spawned - dead) + "/" + spawned});
            txt += this.addVar({caption: "Goal:", value: this._.selectOneNumber(constants.path.DUDES_ESCAPED) + "/" + this._.selectOneNumber(constants.path.GOAL)});
            txt += this.addVar({caption: "LVL:", path: constants.path.PLAYER_LEVEL, number: 1});

			// "env/player/markers/right=3\n"+
            // "env/player/markers/down=2\n"+
            // "env/player/markers/up=1\n"+
            // "env/player/goal=10\n"+
			this.txt(ctx, txt, this._.selectOne(constants.path.LEVEL_NAME));
		}
	})
}
