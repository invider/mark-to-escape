// dot actor
(function() {

    var createMarkFunction = function(direction) {

        return function (_, dat) {
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

                stepOver: function(target) {
                    if (target.markable) {
                        target.direction = direction
                        this._.lib.sfx('turned', 0.5)
                    }
                },
                
                /*
                applyMarker: function(target) {
                },
                */

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
                    switch (direction) {
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
                            throw new Error("Unknown direction:" + direction);
                    }
                    ctx.imageSmoothingEnabled = false;
                    ctx.drawImage(res, this.x, this.y, 1, 1);
                }
            }

        }
    };

    this['@dna/leftMark'] = createMarkFunction(constants.dir.LEFT);
    this['@dna/upMark'] = createMarkFunction(constants.dir.UP);
    this['@dna/downMark'] = createMarkFunction(constants.dir.DOWN);
    this['@dna/rightMark'] = createMarkFunction(constants.dir.RIGHT);

})();
