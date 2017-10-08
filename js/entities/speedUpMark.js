// dot actor
(function() {
    this['@dna/speedUpMark'] = function (_, dat) {
            if (!this._serial) this._serial = 1;
            else this._serial++;
            return {
                type: constants.types.MARK,
                name: 'mark-' + this._serial,

                // state
                x: dat.x,
                y: dat.y,
                w: 1,
                h: 1,
                targetSpeed: 10,
                stepOver: function(target) {
                	target.speed = this.targetSpeed;
                },

                // evolve
                evo: function (scene, delta) {
                },

                // show the dot
                draw: function (ctx) {
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(this._.res.speedupMark, this.x, this.y, 1, 1);
                }
            }

        };

})();
