/*--- variables ---*/

var currentPlayer, state, scoreA, scoreB;

/*--- event listeners ---*/

//pop up window click .on('click', initialize);

// $('table').on('click', '.cell', legalMove);



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
  $('.player1').text(scoreA);
  $('.player2').text(scoreB);
}

function legalMove() {
//player clicks
//run legalMove to see if that move is allowed
  //spot can't have been previously selected
  //check along horizontals, verticals, and diagonals for the difference between
  //the click indexed and next occurance index to be >absval(1)... OR comparison
  // for true occurances, the inner pieces will be flipped so update state
  //what to do on diagonals?
  //if fails, spot can't be selected
  //update score count
  counter(state);
  //update current player
  currentPlayer === 1 ? currentPlayer = -1 : currentPlayer = 1;
  //render(); ie. update scores and class
  render(state);
  //
  }


// Sets up the board to the initial game set-up
 function initialize() {
  createBoard();
  scoreA = 0;
  scoreB = 0;
  state[3][3] = -1;
  state[4][4] = -1;
  state[3][4] = 1;
  state[4][3] = 1;
  currentPlayer = 1;
  counter(state);
  render(state);
 }

 initialize();
