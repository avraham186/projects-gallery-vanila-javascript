'use strict'
const MINE = '💣'
const FLAG = '🚩'
var gBoard
var gLevel
var gGame
var gMineCounter
var gStartGame
var gMinesNegsCounter
var gLives
var gLivesCount
var winner
var loose

function chooseLevel(elLevel){
    if (elLevel.value === 'easy') {
        init(4,2)
    } else if (elLevel.value === 'medium') {
        init(8,12)
    } else if (elLevel.value === 'hard') {
        init(12,30)
    }
}
function init(size, mines) {
    clearInterval(gStartGame)
    gLevel = {
        boardSize: size,
        mines: mines
    }
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    gBoard = createMat(gLevel.boardSize)
    renderBoard(gBoard, document.querySelector('.board'))
    gMineCounter = 0
    gMinesNegsCounter = 0
    document.querySelector('.stop-watch').innerText = gGame.secsPassed
    document.querySelector('.smily-button').innerText = '😃'
    gLives = { 4: '💙💙💙', 3: '💙💙', 2: '💙',1:' '}
    gLivesCount = 4
    document.querySelector('.score').innerText = gLives[gLivesCount]
    winner = new Audio('./sound/clapping.wav')
    loose = new Audio('./sound/wrong.wav')


}

function createMat(size) {
    var mat = []
    for (var i = 0; i < size; i++) {
        var row = []
        for (var j = 0; j < size; j++) {
            row.push({
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
                i: i,
                j: j
            })
        }
        mat.push(row)
    }
    return mat
}


function renderBoard(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var className = 'cell'
            var cellId = `id${i}-${j}`

            if (mat[i][j].isShown && mat[i][j].isMine) {
                strHTML += `<td id="${cellId}" class="${className}" onclick="cellClicked(${i}, ${j})">${MINE}</td>`
            } else if (mat[i][j].isShown) {
                strHTML += `<td id="${cellId}" class="${className}" onclick="cellClicked(${i}, ${j})">${mat[i][j].minesAroundCount}</td>`
            } else if (mat[i][j].isMarked && !mat[i][j].isShown) {
                strHTML += `<td id="${cellId}" class="${className}" onclick="cellClicked(${i}, ${j})">${FLAG}</td>`
            } else {
                strHTML += `<td id="${cellId}" class="${className}" oncontextmenu="cellMarked(event,${i},${j})" onclick="cellClicked(${i}, ${j})">     </td>`
            }
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    selector.innerHTML = strHTML;
}


function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            gBoard[i][j].minesAroundCount = countMinesAround(gBoard, { i, j })
        }
    }
}


function countMinesAround(board, pos) {
    var count = 0
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board[0].length) continue
            if (i === pos.i && j === pos.j) continue
            var cell = board[i][j]
            if (cell.isMine) {
                cell.minesAroundCount++
                count++
            }
        }
    }
    return count
}

function expandShown(iIdx, jJdx) {
    if (gBoard[iIdx][jJdx].minesAroundCount !== 0) return
    for (var i = iIdx - 1; i <= iIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = jJdx - 1; j <= jJdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue
            if (i === iIdx && j === jJdx) continue
            gBoard[i][j].isShown = true
        }
    }
}

function cellClicked(idx, jdx) {
    if (gGame.isOn) {
        if (gBoard[idx][jdx].isMine) {
            gLivesCount--
            document.querySelector('.score').innerText = gLives[gLivesCount]
        }
        gBoard[idx][jdx].isShown = true
        if (!gStartGame) startTimer()
        putMines(gLevel.mines)
        if (gMinesNegsCounter < 1) {
            setMinesNegsCount()
            gMinesNegsCounter++
        }
        expandShown(idx, jdx)
        checkGameOver()
        renderBoard(gBoard, document.querySelector('.board'))
    }
}

function cellMarked(ev, idx, jdx) {
    if (gGame.isOn) {
        ev.preventDefault()
        gBoard[idx][jdx].isMarked = true
        gGame.markedCount++
        renderBoard(gBoard, document.querySelector('.board'))
    }
}

function putMines(minesNum) {
    if (gMineCounter === minesNum) return
    for (var i = 0; i <= minesNum; i++) {
        for (var j = 0; j <= minesNum; j++) {
            if (gMineCounter === minesNum) return
            var randomMineNum = gBoard[getRandomIntInclusive(0, gBoard.length - 1)][getRandomIntInclusive(0, gBoard.length - 1)]
            if (randomMineNum.isShown) continue
            if (randomMineNum.isMine) continue
            randomMineNum.isMine = true
            gMineCounter++
        }
    }
}

function startTimer() {
    gStartGame = setInterval(function () {
        gGame.secsPassed++
        document.querySelector('.stop-watch').innerText = gGame.secsPassed
    }, 1000);
}

function checkGameOver() {
    var endMinesCount = 0
    var endShownCount = 0
    var endMarkedCount = 0
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {

            if (gBoard[i][j].isMine && gBoard[i][j].isShown) {
                endMinesCount++
            }
            if (gBoard[i][j].isMine && gBoard[i][j].isMarked) {
                endMarkedCount++
            }
            if (gBoard[i][j].isShown && !gBoard[i][j].isMine && !gBoard[i][j].isMarked) {
                endShownCount++
            }
        }
    }
    if (endShownCount === (gLevel.boardSize ** 2 - gLevel.mines)) {
        document.querySelector('.smily-button').innerText = '😎'
        gGame.isOn = false
        winner.play()
        clearInterval(gStartGame)
    } else if (endShownCount === (gLevel.boardSize ** 2 - gLevel.mines) && endMarkedCount === gLevel.mines) {
        document.querySelector('.smily-button').innerText = '😎'
        gGame.isOn = false
        winner.play()
        clearInterval(gStartGame)
    } else if (gLivesCount === 1) {
        document.querySelector('.smily-button').innerText = '🤯'
        gGame.isOn = false
        loose.play()
        clearInterval(gStartGame)
    }else if (endMinesCount === gLevel.mines) {
        document.querySelector('.smily-button').innerText = '🤯'
        gGame.isOn = false
        loose.play()
        clearInterval(gStartGame)
    }
}


function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

