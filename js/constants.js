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
        DUDES_SPAWNED_COUNT: "env/player/dudesSpawned",
        SPEED_UP_MARKERS_COUNT: "env/player/markers/speedUp",
        DUDES_ESCAPED: "env/player/dudesEscaped",
        DUDES_DEAD: "env/player/dudesDead",
        GOAL: "env/player/goal",
        LEVEL_NAME: "env/player/levelName",
        RESTART_MARKERS_COUNT: "env/player/markers/restart",
        REMOVE_MARKERS_COUNT: "env/player/markers/remove"
    },
    keyCodes: {
    	TAB: 9,
        SHIFT: 16,
    	UP: 38,
    	DOWN: 40,
    	LEFT: 37,
    	RIGHT: 39,
    	SPACE: 32,
        ENTER: 13,
        NEXT_LEVEL: 112,
        SPAWN_MARK_UP: 49,
        SPAWN_MARK_DOWN: 50,
        SPAWN_MARK_LEFT: 51,
        SPAWN_MARK_RIGHT: 52,
        SPAWN_MARK_SPEDED_UP: 53
    },
    types:{
        MARK: "mark",
        DUDE: "dude",
        WALL: "wall",
        LEVEL_WALL: "levelWall",
    },
    objects:{
        leftMark: "dna/leftMark",
        rightMark: "dna/rightMark",
        upMark: "dna/upMark",
        downMark: "dna/downMark",
        speedUpMark: "dna/speedUpMark",
        removeMark: "dna/removeMark",
        restartMark: "dna/restartMark"
    },
    layers:{
        TILES:"lab/camera/tiles"
    }
};
