/*--- variables ---*/

var currentPlayer, state, scoreA, scoreB, horizontal1, horizontal2,
vertical1, vertical2, diag1, diag2, diag3, diag4;

/*--- event listeners ---*/

$(document).ready(function() {
  $('.modal').show();
})

$('.button').on('click', function () {
  $('.modal').hide();
})

$('.button').on('click', initialize);

$('table').on('click', '.cell', playTurn);



/*--- functions ---*/

// createBoard to create an array of arrays of all zeroes to represent the board
function createBoard() {
  state = [];
  for (var x = 0; x<8; x++) {
      state.push([]);
    for (var y = 0; y<8; y++){
      state[x].push(0);
    }
  }
}

// counter keeps score by iterating through the state array
function counter(array) {
  scoreA = 0;
  scoreB = 0;
  for (var x = 0; x <  array.length; x++) {
    for (var y = 0; y < array[x].length; y++) {
      if (array[x][y] === 1) {
        scoreA++;
      } else if (array[x][y] === -1) {
        scoreB++;
      }
    }
  }
}

function render(array) {
  for (var x = 0; x <  array.length; x++) {
    for (var y = 0; y < array[x].length; y++) {
      if (array[x][y] === 1) {
          $(`#${8*x+y}`).removeClass('red').addClass('blue');
      } else if (array[x][y] === -1){
          $(`#${8*x+y}`).removeClass('blue').addClass('red');
        }
    }
  }
  if (currentPlayer === 1) {
    $('table').removeClass('cursorred').addClass('cursorblue');
    } else
      $('table').removeClass('cursorblue').addClass('cursorred');

  $('.player1').text(scoreA);
  $('.player2').text(scoreB);
}

//run playTurn at Player click
function playTurn(evt) {

  //set the x and y coordinates of the click event
  var clickId = evt.target.id;
  var clickX = Math.floor(clickId/8);
  var clickY = clickId%8;

  //run legalMove to see if that move is allowed !! NEED TO ADD DIAGONALS
  if(!legalMove(clickX, clickY)) return;

  // In the case of a legal move, update the state !! NEED TO ADD FLIPPED PIECES
  updateState(clickX,clickY);

  //update score count
  counter(state);
  //update current player
  currentPlayer === 1 ? currentPlayer = -1 : currentPlayer = 1;
  //render(); ie. update scores and class
  render(state);
  //
  }

function legalMove(clickX, clickY) {
  // create an array of the column where the click event took place
  var clickCol = [];
  for (var x = 0; x <state.length; x++) {
    clickCol.push(state[x][clickY]);
  }
  //create arrays of the diagonals in the SE, SW, NW, NE directions
  var clickDiag1 = [];
  for (var i = 1; i<Math.min(state.length-clickX, state.length-clickY); i++){
    clickDiag1.push(state[clickX+i][clickY+i]);
  }

  var clickDiag2 = [];
  for (var i = 1; i<Math.min(state.length-clickX, clickY+1); i++) {
    clickDiag2.push(state[clickX+i][clickY-i]);
  }

  var clickDiag3 = [];
  for (var i = 1; i<Math.min(clickX+1,clickY+1); i++) {
    clickDiag3.push(state[clickX-i][clickY-i]);
  }

  var clickDiag4 = [];
  for (var i = 1; i<Math.min(clickX+1, state.length-clickY); i++) {
    clickDiag4.push(state[clickX-i][clickY+i]);
  }

  //Doesn't allow a player to select a spot where a piece has already been placed
  if (state[clickX][clickY]) return false;

  //sets and finds the first occurance of currentPlayer's piece or blank cell, along the horizontals, verticals and diagonals
  if (state[clickX].slice(clickY+1).indexOf(0)> -1){
    horizontal1 = state[clickX].slice(clickY+1).indexOf(0) < state[clickX].slice(clickY+1).indexOf(currentPlayer) ? 0 : state[clickX].slice(clickY+1).indexOf(currentPlayer);
  } else {
    horizontal1 = state[clickX].slice(clickY+1).indexOf(currentPlayer);
  }

  if (state[clickX].slice(0,clickY).reverse().indexOf(0)> -1) {
    horizontal2 = state[clickX].slice(0,clickY).reverse().indexOf(0) < state[clickX].slice(0,clickY).reverse().indexOf(currentPlayer) ? 0 : state[clickX].slice(0,clickY).reverse().indexOf(currentPlayer);
  } else {
    horizontal2 = state[clickX].slice(0,clickY).reverse().indexOf(currentPlayer);
  }

  if (clickCol.slice(clickX+1).indexOf(0)> -1) {
  vertical1 = clickCol.slice(clickX+1).indexOf(0) < clickCol.slice(clickX+1).indexOf(currentPlayer) ? 0 : clickCol.slice(clickX+1).indexOf(currentPlayer);
  } else {
    vertical1 = clickCol.slice(clickX+1).indexOf(currentPlayer);
  }

  if (clickCol.slice(0,clickX).reverse().indexOf(0) > -1) {
    vertical2 = clickCol.slice(0,clickX).reverse().indexOf(0) < clickCol.slice(0,clickX).reverse().indexOf(currentPlayer) ? 0 : clickCol.slice(0,clickX).reverse().indexOf(currentPlayer);
  } else {
    vertical2 = clickCol.slice(0,clickX).reverse().indexOf(currentPlayer);
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

// updateState function only updates the state array on a legal move
function updateState(clickX, clickY) {
  state[clickX][clickY] = currentPlayer;
  if (horizontal1 > 0) {
    for (var i = 0; i<= horizontal1; i++) {
      state[clickX][clickY+i] = currentPlayer;
    }
  }
  if (horizontal2 > 0) {
    for (var i = 0; i<= horizontal2; i++) {
      state[clickX][clickY-i] = currentPlayer;
    }
  }
  if (vertical1 > 0) {
    for (var i = 0; i<= vertical1; i++) {
      state[clickX+i][clickY] = currentPlayer;
    }
  }
  if (vertical2 > 0) {
    for(var i = 0; i<= vertical2; i++){
      state[clickX-i][clickY] = currentPlayer;
    }
  }
  if (diag1>0) {
    for(var i = 0; i<= diag1; i++){
      state[clickX+i][clickY+i] = currentPlayer;
    }
  }
  if (diag2>0) {
    for(var i = 0; i<= diag2; i++){
      state[clickX+i][clickY-i] = currentPlayer;
    }
  }
  if (diag3>0) {
    for(var i = 0; i<= diag3; i++){
      state[clickX-i][clickY-i] = currentPlayer;
    }
  }
  if (diag4>0) {
    for(var i = 0; i<= diag4; i++){
      state[clickX-i][clickY+i] = currentPlayer;
    }
  }
}


// Sets up the board to the initial game set-up
function initialize() {
  createBoard();
  state[3][3] = -1;
  state[4][4] = -1;
  state[3][4] = 1;
  state[4][3] = 1;
  currentPlayer = 1;
  counter(state);
  render(state);
 }

