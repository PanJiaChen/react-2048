function init(n) {
    var gameMap = [];
    for (var i = 0; i < n; i++) {
        var tmp = [];
        for (var j = 0; j < n; j++) {
            tmp.push({
                value: 0,
                isNew: false,
                isMerged: false
            });
        }
        gameMap.push(tmp);
    }
    return gameMap;
}

function sildeTo(direction, gd) {

}

function getRandom() {
    // var set = [2, 2, 2, 2, 4, 4];
    // var num = set[Math.floor(Math.random() * set.length)];
    var randomNum = Math.random() < 0.5 ? 2 : 4
    return {
        value: randomNum,
        isNew: true,
        isMerged: false
    };
}

function checkGameStatusAndAddTile(gd, MaxScore) {

    var state;
    var pool = [];
    gd.numSet.forEach(function(row, keyRow) {
        row.forEach(function(elem, keyCol) {
            if (elem.value >= MaxScore) {
                state = true;
            } else if (elem.value === 0) {
                pool.push({
                    x: keyRow,
                    y: keyCol
                });
            }
        });
    });
    //console.log(gd.numSet);
    // if (state === true) {
    //     gd.status = 'win';
    //     return gd;
    // }
    // if (pool.length === 0) {
    //     gd.status = 'lose';
    //     return gd;
    // }
    var pos = pool[Math.floor(Math.random() * pool.length)];
    var tilte = getRandom();
    return fillTile(gd, pos, tilte);
}

function fillTile(gd, pos, tilte) {
    console.log(pos.x,pos.x,tilte)
    gd.numSet[pos.x][pos.y] = tilte;
    return gd;
}

function startGame() {
    var score = 0;
    // var bestScore = window.localStorage.getItem('bestScore');
    // bestScore = bestScore ? bestScore : 0;
    var status = 'runing';
    var MapLen = 4;
    var MaxScore = 2048;
    var gameData = init(MapLen);
    var gd = {
        numSet: gameData,
        scoreBoard: {
            score: score,
            // bestScore: bestScore,
            scoreAddition: 0
        },
        status: status
    };
    for (i = 0; i < 2; i++) {
        gd = addNewNum(gd, MaxScore);
    }
    console.log(gd)
    return gd;
}

function addNewNum(gd, MaxScore) {
    var gd=checkGameStatusAndAddTile(gd, MaxScore);
    return gd;
}
