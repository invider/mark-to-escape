// dot actor
(function() {
    const UP = 'UP';
    const DOWN = 'DOWN';
    const LEFT = 'LEFT';
    const RIGHT = 'RIGHT';
    this['@dna/mark'] = function (_, dat) {

        if (!this._serial) this._serial = 1;
        else this._serial++;
        return {
            x: dat.x,
            y: dat.y,
            name: 'mark-' + this._serial,
            // state
            direction: arguments.callee.direction,
            // evolve
            evo: function (scene, delta) {
                _.lib.getObjectsAt(this.x, this.y).forEach(function(o){
                    console.log(o);
                    debugger;
                });
            },

            // show the dot
            draw: function (ctx) {
                ctx.fillStyle = "#444444";
                ctx.fillRect(this.x, this.y, 1, 1);
            }
        }

    };
    this['@dna/leftMark'] = this['@dna/mark'];
    this['@dna/upMark'] = this['@dna/mark'];
    this['@dna/downMark'] = this['@dna/mark'];
    this['@dna/rightMark'] = this['@dna/mark'];

    this['@dna/upMark'].direction = UP;
    this['@dna/downMark'].direction = DOWN;
    this['@dna/leftMark'].direction = LEFT;
    this['@dna/rightMark'].direction = RIGHT;
})();
