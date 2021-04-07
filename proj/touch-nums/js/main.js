'use strict'

var gLevel = 4
var gCurrentNum
var gBoardNums
var gStartTime
// console.log(gboardNums);



function init(level) {
    gLevel = level
    gBoardNums = shffleBoard(cBoardNum(gLevel * gLevel))
    gCurrentNum = 0
    renderboard(gBoard)

}

//create game board
function cGameBoared(level, boardNums) {
    
}
//create the array for the numbers in the board
function cBoardNum(arrNums) {
    var boardNums = []
    for (var i = 1; i <= arrNums; i++) {
        boardNums.push(i)
    }
    return boardNums
}
// shuffle the array of the board
function shffleBoard(sortedArrBoared) {
    var rand
    for (var i = 0; i < sortedArrBoared.length; i++) {
        rand = Math.floor(Math.random() * (i + 1))
        var currNum = sortedArrBoared[i]
        sortedArrBoared[i] = sortedArrBoared[rand]
        sortedArrBoared[rand] = currNum
    }
    return sortedArrBoared
}


//check the number the user clicked
function isClicked(elButton) {
    // var boardNums = shffleBoard(cBoardNum(gLevel * gLevel))
    var elNextNumber = document.querySelector('.next-number')
    if (+elButton.innerText !== (gCurrentNum + 1)) return
    elButton.style = 'background-color:red'
    console.log('gboardNums is clicked',gBoardNums);
    if (gCurrentNum === gBoardNums.length - 1) return
    gCurrentNum++
    if (gCurrentNum === 1) {
        gStartTime = Date.now()
        stopwatch()
    }
    elNextNumber.innerText = gCurrentNum + 1

}

// start stop watch
function stopwatch() {
    var elGameTime = document.querySelector('.game-time')
    // gboardNums = shffleBoard(cBoardNum(gLevel * gLevel))
    console.log(gCurrentNum);
    var time = setInterval(function () {
        gStartTime = gStartTime + 11;
        elGameTime.innerHTML = (gStartTime/1000)
    }, 100)
    if (gCurrentNum >= gBoardNums.length - 1) {
        console.log('gboard stopwatch',gBoardNums);
        console.log('currentnume stopwatch',gCurrentNum);
    }
}


function renderboard(board) {
    var tableStr = '<table>'
    for (var i = 0; i < level; i++) {
        tableStr += '<tr>'
        for (var j = 0; j < level; j++) {
            tableStr += `<td><button onclick="isClicked(this)">${boardNums.pop()}</button></td>`
        }
    }
    tableStr += '</tr></table>'
    var gameBoard = document.querySelector('.game-board')
    gameBoard.innerHTML = tableStr
}