// dot actor
(function() {
    this['@dna/mark'] = function (_, dat) {

        if (!this._serial) this._serial = 1;
        else this._serial++;

        let dumpTime = 0
        return {
            type: constants.types.MARK,
            name: 'mark-' + this._serial,

            // state
            x: dat.x,
            y: dat.y,
            w: 1,
            h: 1,
            direction: arguments.callee.direction,

            hit: function(hitter) {
                // we got a dude here
                this._.log.debug('marking  ' + this.direction + ': ' + hitter.name)
            },

            // evolve
            evo: function (scene, delta) {
                // _.lib.getObjectsAt(this.x, this.y).forEach(function(o){
                //     console.log(o);
                //     debugger;
                // });
            },

            // show the dot
            draw: function (ctx) {
                // ctx.fillStyle = "#444444";
                // ctx.fillRect(this.x, this.y, 1, 1);
                let res = "";
                switch (this.direction){
                    case constants.dir.UP:
                        res = this._.res.up_mark;
                        break;
                    case constants.dir.DOWN:
                        res = this._.res.down_mark;
                        break;
                    case constants.dir.LEFT:
                        res = this._.res.left_mark;
                        break;
                    case constants.dir.RIGHT:
                        res = this._.res.right_mark;
                        break;
                    default:
                        throw new Error("Unknown direction:" + this.direction);
                }
                ctx.imageSmoothingEnabled = false
                ctx.drawImage(res, this.x, this.y, 1, 1);
            }
        }

    };
    this['@dna/leftMark'] = this['@dna/mark'];
    this['@dna/upMark'] = this['@dna/mark'];
    this['@dna/downMark'] = this['@dna/mark'];
    this['@dna/rightMark'] = this['@dna/mark'];

    this['@dna/upMark'].direction = constants.dir.UP;
    this['@dna/downMark'].direction = constants.dir.DOWN;
    this['@dna/leftMark'].direction = constants.dir.LEFT;
    this['@dna/rightMark'].direction = constants.dir.RIGHT;
})();
