/*--- variables ---*/

var currentPlayer, board, scoreA, scoreB, horizontal1, horizontal2,
vertical1, vertical2, diag1, diag2, diag3, diag4, gameOver, winningColor;

var sound = 'https://www.freesound.org/data/previews/41/41857_160760-lq.mp3';
var player = new Audio();


/*--- event listeners ---*/

$(document).ready(function() {
  $('.gamestart').toggle();
})

$('#begin').on('click', function () {
   $('.gamestart').toggle();
})

$('#replay').on('click', function () {
   $('.endgame').toggle();
})

$('.button').on('click', initialize);

$('table').on('click', '.cell', playTurn);

$('.skipturn').on('click', function() {
  currentPlayer === 1 ? currentPlayer = -1 : currentPlayer = 1;
  checkWinner();
  render(board);
})


/*--- functions ---*/

// When called, createBoard creates an 8x8 array of arrays of zeroes to represent the blank board
function createBoard() {
  board = [];
  for (var i = 0; i<8; i++) {
      board.push([]);
    for (var j = 0; j<8; j++){
      board[i].push(0);
    }
  }
}

// counter function is used to get the score by iterating through the game board array
function counter() {
  scoreA = 0;
  scoreB = 0;
  for (var i = 0; i <  board.length; i++) {
    for (var j = 0; j < board[i].length; j++) {
      if (board[i][j] === 1) {
        scoreA++;
      } else if (board[i][j] === -1) {
        scoreB++;
      }
    }
  }
}

// updateState function updates the game board array in the case of a legal move
function updateState(x, y) {

  //updates the spot where the player placed their game piece
  board[x][y] = currentPlayer;

  //updates the pieces that are 'overtaken' in each direction
  if (horizontal1 > 0) {
    for (var i = 0; i<= horizontal1; i++) {
      board[x][y+i] = currentPlayer;
    }
  }
  if (horizontal2 > 0) {
    for (var i = 0; i<= horizontal2; i++) {
      board[x][y-i] = currentPlayer;
    }
  }
  if (vertical1 > 0) {
    for (var i = 0; i<= vertical1; i++) {
      board[x+i][y] = currentPlayer;
    }
  }
  if (vertical2 > 0) {
    for(var i = 0; i<= vertical2; i++){
      board[x-i][y] = currentPlayer;
    }
  }
  if (diag1>0) {
    for(var i = 0; i<= diag1; i++){
      board[x+i][y+i] = currentPlayer;
    }
  }
  if (diag2>0) {
    for(var i = 0; i<= diag2; i++){
      board[x+i][y-i] = currentPlayer;
    }
  }
  if (diag3>0) {
    for(var i = 0; i<= diag3; i++){
      board[x-i][y-i] = currentPlayer;
    }
  }
  if (diag4>0) {
    for(var i = 0; i<= diag4; i++){
      board[x-i][y+i] = currentPlayer;
    }
  }
}

// render function updates the view to reflect the state of the board
function render() {
  for (var x = 0; x <  board.length; x++) {
    for (var y = 0; y < board[x].length; y++) {
      if (board[x][y] === 1) {
          $(`#${8*x+y}`).removeClass('red').addClass('blue');
      } else if (board[x][y] === -1){
          $(`#${8*x+y}`).removeClass('blue').addClass('red');
        } else {
          $(`#${8*x+y}`).removeClass('blue').removeClass('red');
        }
    }
  }
  if (currentPlayer === 1) {
    $('table').removeClass('cursorred').addClass('cursorblue');
    } else
      $('table').removeClass('cursorblue').addClass('cursorred');

  $('.player1').text(scoreA);
  $('.player2').text(scoreB);

  if (gameOver) {
    $('.win-message').text('Congrats ' + winningColor + '! You win.');
    $('.endgame').toggle();
  }
}

//run playTurn at Player click
function playTurn(evt) {

  //set the x and y coordinates of the click event
  var clickId = evt.target.id;
  var clickX = Math.floor(clickId/8);
  var clickY = clickId%8;

  //run legalMove to see if that move is allowed
  if(!legalMove(clickX, clickY, currentPlayer)) return;

  // In the case of a legal move, update the board state
  updateState(clickX,clickY);

  //update score count
  counter();
  //update current player
  currentPlayer === 1 ? currentPlayer = -1 : currentPlayer = 1;

  var pieceFlip = Math.max(horizontal1, horizontal2, vertical1, vertical2, diag1, diag2, diag3, diag4);
  for (var i = 0; i < pieceFlip; i++) {
    setTimeout(function() {
      player.play();
    }, 215 * i);
  }
  //check for winner
  checkWinner();
  //render(); ie. update scores and class
  render();
}

function legalMove(x, y, currentPlayer) {
  // create an array of the column where the click event took place
  var clickCol = [];
  for (var i = 0; i <board.length; i++) {
    clickCol.push(board[i][y]);
  }
  //create arrays of the diagonals in the SE, SW, NW, NE directions
  var clickDiag1 = [];
  for (var i = 1; i<Math.min(board.length-x, board.length-y); i++){
    clickDiag1.push(board[x+i][y+i]);
  }

  var clickDiag2 = [];
  for (var i = 1; i<Math.min(board.length-x, y+1); i++) {
    clickDiag2.push(board[x+i][y-i]);
  }

  var clickDiag3 = [];
  for (var i = 1; i<Math.min(x+1,y+1); i++) {
    clickDiag3.push(board[x-i][y-i]);
  }

  var clickDiag4 = [];
  for (var i = 1; i<Math.min(x+1, board.length-y); i++) {
    clickDiag4.push(board[x-i][y+i]);
  }

  //Doesn't allow a player to select a spot where a piece has already been placed
  if (board[x][y]) return false;

  //sets and finds the first occurance of currentPlayer's piece or blank cell, along the horizontals, verticals and diagonals
  if (board[x].slice(y+1).indexOf(0)> -1){
    horizontal1 = board[x].slice(y+1).indexOf(0) < board[x].slice(y+1).indexOf(currentPlayer) ? 0 : board[x].slice(y+1).indexOf(currentPlayer);
  } else {
    horizontal1 = board[x].slice(y+1).indexOf(currentPlayer);
  }

  if (board[x].slice(0,y).reverse().indexOf(0)> -1) {
    horizontal2 = board[x].slice(0,y).reverse().indexOf(0) < board[x].slice(0,y).reverse().indexOf(currentPlayer) ? 0 : board[x].slice(0,y).reverse().indexOf(currentPlayer);
  } else {
    horizontal2 = board[x].slice(0,y).reverse().indexOf(currentPlayer);
  }

  if (clickCol.slice(x+1).indexOf(0)> -1) {
  vertical1 = clickCol.slice(x+1).indexOf(0) < clickCol.slice(x+1).indexOf(currentPlayer) ? 0 : clickCol.slice(x+1).indexOf(currentPlayer);
  } else {
    vertical1 = clickCol.slice(x+1).indexOf(currentPlayer);
  }

  if (clickCol.slice(0,x).reverse().indexOf(0) > -1) {
    vertical2 = clickCol.slice(0,x).reverse().indexOf(0) < clickCol.slice(0,x).reverse().indexOf(currentPlayer) ? 0 : clickCol.slice(0,x).reverse().indexOf(currentPlayer);
  } else {
    vertical2 = clickCol.slice(0,x).reverse().indexOf(currentPlayer);
  }

  if (clickDiag1.indexOf(0) >-1) {
    diag1 = clickDiag1.indexOf(0) < clickDiag1.indexOf(currentPlayer) ? 0 : clickDiag1.indexOf(currentPlayer);
  } else {
    diag1 = clickDiag1.indexOf(currentPlayer);
  }

  if (clickDiag2.indexOf(0) >-1) {
    diag2 = clickDiag2.indexOf(0) < clickDiag2.indexOf(currentPlayer) ? 0 : clickDiag2.indexOf(currentPlayer);
  } else {
    diag2 = clickDiag2.indexOf(currentPlayer);
  }

  if (clickDiag3.indexOf(0) >-1) {
    diag3 = clickDiag3.indexOf(0) < clickDiag3.indexOf(currentPlayer) ? 0 : clickDiag3.indexOf(currentPlayer);
  } else {
    diag3 = clickDiag3.indexOf(currentPlayer);
  }

  if (clickDiag4.indexOf(0) >-1) {
    diag4 = clickDiag4.indexOf(0) < clickDiag4.indexOf(currentPlayer) ? 0 : clickDiag4.indexOf(currentPlayer);
  } else {
    diag4 = clickDiag4.indexOf(currentPlayer);
  }


// Checks to see if the move is legal in at least one direction
return horizontal1 > 0 || horizontal2 > 0 || vertical1 > 0 ||
  vertical2 > 0 || diag1 > 0 || diag2 > 0 || diag3 > 0 || diag4 > 0;

}



// Checks to see if there is a winner
function checkWinner() {
  // check which score is bigger
  winningColor = scoreA > scoreB ? 'blue' : 'red';

  var emptySpaces = [];

  //iterates through the board array and pushes the indices of all empty spaces to emptySpaces
  for (var x = 0; x <board.length; x++){
    var emptyX = getAllIndexes(board[x],0);
    for(var y = 0; y < emptyX.length; y++) {
      emptySpaces.push([x,emptyX[y]]);
    }
  }

  if (!emptySpaces.length) {
    gameOver = true;
    return;
  }

  for (var i = 0; i<emptySpaces.length; i++){
    if (legalMove(emptySpaces[i][0],emptySpaces[i][1], currentPlayer) ||
      legalMove(emptySpaces[i][0], emptySpaces[i][1], -currentPlayer)) return;
  }

  gameOver = true;

}


//get indexes of empty spaces
function getAllIndexes(array, val) {
  var indices = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] === val) {
      indices.push(i);
    }
  }
  return indices;
}

// Sets up the board to the initial game set-up
function initialize() {
  createBoard();
  board[3][3] = -1;
  board[4][4] = -1;
  board[3][4] = 1;
  board[4][3] = 1;
  currentPlayer = 1;
  gameOver = false;
  counter();
  player.src = sound;
  render();
 }
