//移动端
documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;
gridContainerWidth = 440;
cellSpace = 5;
cellSideLength = 100;

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

function getPosTop(i, j) {
    return cellSpace + i * (cellSpace * 2 + cellSideLength);
}

function getPosLeft(i, j) {
    return cellSpace + j * (cellSpace * 2 + cellSideLength);;
}

function clearnumSetStatus(gd) {
    gd.numSet.forEach(function(row, keyRow) {
        row.forEach(function(elem, keyCol) {
            gd.numSet[keyRow][keyCol].isNew = false;
            gd.numSet[keyRow][keyCol].isMerged = false;
        });
    });
    return gd;
}

function slideTo(direction, gd) {
    switch (direction) {
        case 'up':
            gd = clearnumSetStatus(gd);
            gd = slideToTop(gd);
            break;

        case 'down':
            gd = clearnumSetStatus(gd);
            gd = slideToBottom(gd);
            break;

        case 'left':
            gd = clearnumSetStatus(gd);
            gd = slideToLeft(gd);
            break;

        case 'right':
            gd = clearnumSetStatus(gd);
            gd = slideToRight(gd);
            break;
    }
    gd = addNewNum(gd, 2048);
    return gd;
}

function slideToTop(gd) {
    gd.scoreBoard.scoreAddition = 0;
    var tl = gd.numSet.length;
    var changed = false;
    var notfull = false;
    for (var i = 0; i < tl; i++) {

        var np = tl;
        var n = 0; // 统计每一列中非零值的个数

        // 向上移动非零值，如果有零值元素，则用非零元素进行覆盖
        for (var x = 0; x < np; x++) {
            if (gd.numSet[x][i].value != 0) {
                gd.numSet[n][i].value = gd.numSet[x][i].value;
                if (n != x) {
                    changed = true; // 标示数组的元素是否有变化
                }
                n++;
            }
        }
        if (n < tl) {
            notfull = true;
        }
        np = n;
        // 向上合并所有相同的元素
        for (var u = 0; u < np - 1; u++) {
            if (gd.numSet[u][i].value == gd.numSet[u + 1][i].value) {
                gd.numSet[u][i].value *= 2;
                gd.numSet[u][i].isMerged = true;
                gd.numSet[u + 1][i] = {
                    value: 0,
                    isNew: false,
                    isMerged: false
                };
                gd.scoreBoard.scoreAddition += gd.numSet[u][i].value;
                // gd.scoreBoard.score += gd.scoreBoard.scoreAddition; // 计算游戏分数
                // if (gd.scoreBoard.score > gd.scoreBoard.bestScore) {
                //     gd.scoreBoard.bestScore = gd.scoreBoard.score;
                //     window.localStorage.setItem('bestScore', gd.scoreBoard.bestScore);
                // }
                u++;
                changed = true;
            }
        }
        // 合并完相同元素以后，再次向上移动非零元素
        n = 0;
        for (var t = 0; t < np; t++) {
            if (gd.numSet[t][i].value != 0) {
                gd.numSet[n][i] = gd.numSet[t][i]
                n++
            }
        }
        // 对于没有检查的元素
        for (var o = n; o < tl; o++) {
            gd.numSet[o][i] = {
                value: 0,
                isNew: false,
                isMerged: false
            };
        }
    }
    return gd;
}

function slideToBottom(gd) {
    gd = MirrorV(gd);
    gd = slideToTop(gd);
    gd = MirrorV(gd);
    return gd;
}

function slideToLeft(gd) {
    gd = Right90(gd);
    gd = slideToTop(gd);
    gd = Left90(gd);
    return gd;
}

function slideToRight(gd) {
    gd = Left90(gd);
    gd = slideToTop(gd);
    gd = Right90(gd);
    return gd;
}

function Right90(gd) {
    var MapLen = gd.numSet.length;
    var newGd = init(MapLen);
    gd.numSet.forEach(function(row, x) {
        row.forEach(function(elem, y) {
            newGd[y][MapLen - x - 1] = elem;
        });
    })
    gd.numSet = newGd;
    return gd;
}

function Left90(gd) {
    var MapLen = gd.numSet.length;
    var newGd = init(MapLen);
    gd.numSet.forEach(function(row, x) {
        row.forEach(function(elem, y) {
            newGd[MapLen - y - 1][x] = elem;
        });
    })
    gd.numSet = newGd;
    return gd;
}

function MirrorV(gd) {
    var MapLen = gd.numSet.length;
    var newGd = init(MapLen);
    gd.numSet.forEach(function(row, x) {
        row.forEach(function(elem, y) {
            newGd[MapLen - x - 1][y] = elem;
        });
    })
    gd.numSet = newGd;
    return gd;
}

function checkGameStatusAndAddTile(gd, MaxScore) {

    var state;
    var pool = [];
    console.log(gd.numSet)
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
    // console.log(pool)
    var tilte = getRandom();
    return fillTile(gd, pos, tilte);
}

function fillTile(gd, pos, tilte) {
    // console.log(pos.x, pos.x, tilte)
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
    return gd;
}

function addNewNum(gd, MaxScore) {
    var gd = checkGameStatusAndAddTile(gd, MaxScore);
    return gd;
}
