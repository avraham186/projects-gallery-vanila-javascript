'use strict'
var WALL = 'WALL';
var FLOOR = 'FLOOR';
var BALL = 'BALL';
var GAMER = 'GAMER';

var GAMER_IMG = '<img src="img/gamer.png" />';
var BALL_IMG = '<img src="img/ball.png" />';

var gBoard;
var gGamerPos;
var gBallsAssignTime
var gBallsCount = 0
var gBallSound
var gEndBall = 0

function initGame() {
	gGamerPos = { i: 2, j: 9 };
	gBoard = buildBoard();
	renderBoard(gBoard);
	gBallsAssignTime = setInterval(randBalls, 3000)
	gBallSound = new Audio('ball.wav')
}

function randBalls() {
	var i = getRandomIntInclusive(1, 8)
	var j = getRandomIntInclusive(1, 10)
	var coor = { i, j }
	if (gBoard[i][j].gameElement !== GAMER && gBoard[i][j].gameElement !== BALL && gBoard[i][j].type !== WALL) {
		gBoard[i][j].gameElement = BALL
		renderCell(coor, BALL_IMG)
		gEndBall++
	} else {
		return
	}
}
function buildBoard() {
	// Create the Matrix
	var board = createMat(10, 12)


	// Put FLOOR everywhere and WALL at edges
	for (var i = 0; i < board.length; i++) {
		for (var j = 0; j < board[0].length; j++) {
			// Put FLOOR in a regular cell
			var cell = { type: FLOOR, gameElement: null };

			// Place Walls at edges
			if (i === 0 || i === board.length - 1 || j === 0 || j === board[0].length - 1) {
				cell.type = WALL;
			}

			// Add created cell to The game board
			board[i][j] = cell;
		}
	}
	var passageCell = { type: FLOOR, gameElement: null }
	board[0][5] = passageCell
	board[9][5] = passageCell
	board[5][0] = passageCell
	board[5][11] = passageCell
	// Place the gamer at selected position
	board[gGamerPos.i][gGamerPos.j].gameElement = GAMER;

	// Place the Balls (currently randomly chosen positions)
	// setInterval(board[getRandomIntInclusive(1, 10)][getRandomIntInclusive(1, 10)].gameElement = BALL, 3000)
	// board[3][8].gameElement = BALL;
	// board[7][4].gameElement = BALL;

	// console.log('board',board);
	return board;
}

// Render the board to an HTML table
function renderBoard(board) {

	var strHTML = '';
	for (var i = 0; i < board.length; i++) {
		strHTML += '<tr>\n';
		for (var j = 0; j < board[0].length; j++) {
			var currCell = board[i][j];

			var cellClass = getClassName({ i: i, j: j })

			// TODO - change to short if statement
			if (currCell.type === FLOOR) cellClass += ' floor'; currCell.type === FLOOR ? cellClass += ' floor' : cellClass += ' wall'

			//TODO - Change To template string
			strHTML += `\t<td class="cell ${cellClass} onclick="moveTo(${i},${j})" >\n`;

			// TODO - change to switch case statement
			if (currCell.gameElement === GAMER) {
				strHTML += GAMER_IMG;
			} else if (currCell.gameElement === BALL) {
				strHTML += BALL_IMG;
			}

			strHTML += '\t</td>\n';
		}
		strHTML += '</tr>\n';
	}

	console.log('strHTML is:');
	console.log(strHTML);
	var elBoard = document.querySelector('.board');
	// var elCount = document.querySelector('.count')
	// elCount.innerText = gBallsCount
	elBoard.innerHTML = strHTML;
}

// Move the player to a specific location
function moveTo(i, j) {

	var targetCell = gBoard[i][j];
	if (targetCell.type === WALL) return;

	// Calculate distance to make sure we are moving to a neighbor cell
	var iAbsDiff = Math.abs(i - gGamerPos.i);
	var jAbsDiff = Math.abs(j - gGamerPos.j);

	// If the clicked Cell is one of the four allowed
	if ((iAbsDiff === 1 && jAbsDiff === 0) || (jAbsDiff === 1 && iAbsDiff === 0)) {

		if (targetCell.gameElement === BALL) {
			gBallsCount++
			var elCount = document.querySelector('.count')
			elCount.innerText = gBallsCount
			gBallSound.play()
			if (gEndBall === gBallsCount) {
				console.log('win');
				restart()
			}
		}
		function restart() {
			clearInterval(gBallsAssignTime)
			gEndBall = 0
			gBallsCount = 0
			var elDiv = document.querySelector('.restart')
			elDiv.innerHTML = '<button class="restart-game" onclick="initGame()">new game</button>'
		}

		// MOVING from current position
		// Model:
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
		// Dom:
		renderCell(gGamerPos, '');

		// MOVING to selected position
		// Model:
		gGamerPos.i = i;
		gGamerPos.j = j;
		gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
		// DOM:
		renderCell(gGamerPos, GAMER_IMG);

	} //else console.log('TOO FAR', iAbsDiff, jAbsDiff);

}

// Convert a location object {i, j} to a selector and render a value in that element
function renderCell(location, value) {
	var cellSelector = '.' + getClassName(location)
	var elCell = document.querySelector(cellSelector);
	elCell.innerHTML = value;

}

// Move the player by keyboard arrows
function handleKey(event) {

	var i = gGamerPos.i;
	var j = gGamerPos.j;


	switch (event.key) {
		case 'ArrowLeft':
			if (i === 5 && j === 0) {
				var delCoor = { i: 5, j: 0 }
				gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
				gGamerPos = { i: 5 , j: 11 }
				gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
				renderCell(delCoor, '');
				renderCell(gGamerPos, GAMER_IMG);
				break;
			}
			moveTo(i, j - 1);
			break;
		case 'ArrowRight':
			if (i === 5 && j === 11) {
				// gBoard[0][5].gameElement = null
				var delCoor = { i: 5, j: 11 }
				gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
				gGamerPos = { i: 5, j: 0 }
				gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
				renderCell(delCoor, '');
				renderCell(gGamerPos, GAMER_IMG);
				break;
			}
			moveTo(i, j + 1);
			break;
		case 'ArrowUp':
			if (i === 0 && j === 5) {
				var delCoor = { i: 0, j: 5 }
				gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
				gGamerPos = { i: 9, j: 5 }
				gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
				renderCell(delCoor, '');
				renderCell(gGamerPos, GAMER_IMG);
				break;
			}
			moveTo(i - 1, j);
			break;
		case 'ArrowDown':
			if (i === 9 && j === 5) {
				var delCoor = { i: 9, j: 5 }
				gBoard[gGamerPos.i][gGamerPos.j].gameElement = null;
				gGamerPos = { i: 0, j: 5 }
				gBoard[gGamerPos.i][gGamerPos.j].gameElement = GAMER;
				renderCell(delCoor, '');
				renderCell(gGamerPos, GAMER_IMG);
				break;
			}
			moveTo(i + 1, j);
			break;

	}

}

// Returns the class name for a specific cell
function getClassName(location) {
	var cellClass = 'cell-' + location.i + '-' + location.j;
	return cellClass;
}

