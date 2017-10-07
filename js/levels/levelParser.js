(function(){
    const MACRO_CODE_SPLITTER = "_";
    const MACRO_DELIMITER = ";";
    const LEVEL_DELIMITER = "\n";

    var parseMacro = function (macro) {
        if (macro[0] != 'M'){
            return macro;
        }
        var splittedMacro = macro.split(MACRO_CODE_SPLITTER);
        if (splittedMacro.length != 3){
            throw new Error("Error, macro format is wrong:" + macro);
        }
        return {
            name: splittedMacro[1],
            value: splittedMacro[2],
        }
    };

    var applyAndParse = function (lvl, macro){
        macro = macro || "";
        var macrosObject = {};
        macro
            .split(MACRO_DELIMITER)
            .map(f => f.trim())
            .filter(f => f.length)
            .map(parseMacro)
            .forEach(function(v){
                macrosObject[v.name] = v.value;
            });

        lvl = lvl
            .split("")
            .map(d => macrosObject[d] != undefined ? macrosObject[d]: d);

        var res = [];
        var row = [];
        for (var k in lvl){
            var symbol = lvl[k];
            if (symbol == LEVEL_DELIMITER){
                res.push(row);
                row = [];
            } else {
                row.push(symbol);
            }
        }
        res.push(row);
        return res;
    };

    var parser = function(lvl, macro, cb){
        var y = 0;
        var params = {
            w: 0,
            h: 0
        };
        var parsed = applyAndParse(lvl, macro);
        params.h = parsed.length;
        parsed.forEach(function(r){ params.w = Math.max(params.w, r.length)});
        parsed.forEach(function(r){ if (r.length < params.w) {
            for (var i = 0; i < params.w - r.length; i++){
                r.push("");
            }
        }});
        parsed.forEach(function(row){
            var x = 0;
            row.forEach(function(symbol){
                cb(x, y, symbol, params);
                x++;
            });
            y++;
        });
    };
    this["@lib/parser/parse"] = parser;
})();




