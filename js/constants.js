const constants = {
    dir:{
        UP : { dx: 0, dy: -1, r: Math.ceil },
        DOWN : { dx: 0, dy: 1, r: Math.floor },
        LEFT : { dx: -1, dy: 0, r: Math.ceil },
        RIGHT : { dx: 1, dy: 0, r: Math.floor },
        NONE: { dx: 0, dy: 0, r: Math.floor, none: true }
    },
    path:{
        PLAYER_LEVEL: "env/player/currentLevel",
        RIGHT_MARKERS_COUNT: "env/player/markers/right",
        LEFT_MARKERS_COUNT: "env/player/markers/left",
        UP_MARKERS_COUNT: "env/player/markers/up",
        DOWN_MARKERS_COUNT: "env/player/markers/down",
        DUDES_SPAWNED_COUNT: "env/player/dudesSpawned"
    },
    keyCodes: {
    	UP: 38,
    	DOWN: 40,
    	LEFT: 37,
    	RIGHT: 39,
        SPAWN_MARK_UP: 49,
        SPAWN_MARK_DOWN: 50,
        SPAWN_MARK_LEFT: 51,
        SPAWN_MARK_RIGHT: 52,
    },
    types:{
        MARK: "mark"
    },
    objects:{
        leftMark: "dna/leftMark"
    },
    layers:{
        TILES:"lab/camera/tiles"
    }
};