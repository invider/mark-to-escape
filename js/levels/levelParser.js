(function(){
    const MACRO_CODE_SPLITTER = "_";
    const MACRO_DELIMITER = ";";
    const LEVEL_DELIMITER = "\n";
    const SETTINGS_DELIMITER = "\n";
    const LEVEL_SETTINGS_DELIMITER = "^^^SETTINGS^^^";
    const LEVEL_MACROS_DELIMITER = "^^^MACROS^^^";
    const PARAMETRIC_RE = /[a-zA-Z@\.\,]([0-9]+)/;
    var parseSection = function(lvl, type){
        var cchunks = lvl.split(type);
        if (cchunks.length == 1){
            return {lvl: lvl, section:""};
        }
        if (cchunks.length != 2){
            throw new Error("Wrong level format:" + lvl)
        }
        return {lvl: cchunks[1], section:cchunks[0]};
    };
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

    var parseSettings = function(settings){
        var res = {};
        settings
            .split(SETTINGS_DELIMITER)
            .map(f => f.trim())
            .filter(f => f.length)
            .map(function(f){
                var chunks = f.split("=");
                if (chunks.length != 2){
                    throw new Error("Error setting:" + f);
                }
                return {name:chunks[0], value: chunks[1]};
            })
            .forEach(function(s){
                res[s.name] = s.value;
            });
        return res;
    };

    var applyAndParse = function (lvl, macro){
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

        macro = macro || "";
        var settingsParse = parseSection(lvl, LEVEL_SETTINGS_DELIMITER);
        var settings = parseSettings(settingsParse.section);
        lvl = settingsParse.lvl;
        var macroParse = parseSection(lvl, LEVEL_MACROS_DELIMITER);
        lvl = macroParse.lvl;
        var macro = macro + "\n" + macroParse.section;

        var y = 0;
        var params = {
            w: 0,
            h: 0,
            settings: settings
        };
        var parsed = applyAndParse(lvl, macro);
        params.h = parsed.length;
        parsed.forEach(function(r){ params.w = Math.max(params.w, r.length)});
        parsed.forEach(function(r){ if (r.length < params.w) {
            for (var i = 0; i < params.w - r.length; i++){
                r.push("");
            }
        }});
        console.log("parsed data:", parsed);
        parsed.forEach(function(row){
            var x = 0;
            row.forEach(function(symbol){
                let param = undefined;
                let parametricRes = PARAMETRIC_RE.exec(symbol);
                if (parametricRes){
                    param = parametricRes[1];
                    symbol = symbol[0];
                }
                cb(x, y, symbol, params, param);
                x++;
            });
            y++;
        });
        return params;
    };
    this["@lib/parser/parse"] = function(lvl, cb){
        var parsed = parser(lvl, this._.selectOne("lib/parser/globalMacros"), cb);
        for (var k in parsed){
            this._.patch(this._, k, parsed[k]);
        }
        return parsed;
    };
    // var settings = parser("a=1\nb=0^^^SETTINGS^^^", "", function(x, y, s, p){
    //     console.log(x, y, s, p);
    // });
    // console.log("Settings:", settings);
})();




