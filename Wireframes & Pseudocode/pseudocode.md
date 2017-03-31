# Othello
## Pseudocode
### Starting Set-up
The initial state of the game board is an 8x8 square with 4 game pieces set up as a square in the middle of the board, with the diagonals being of matching colors


### While the game is ongoing...  

1. Check to see that a legal move is possible. If it is not, switch current player. If both players are unable to make a move - game over.

2. The current player places their colored piece on the board in a position that will overthrow at least one of their opponent's colored pieces ie. a legal move
    - to "overthrow" means that an adjacent piece of the opponent's color is set between your played piece and one of your existing pieces on the board
3. Change the state of game
    - update the state of the state array at the spot clicked
    - change all overthrown elements to your's from the spot clicked along all vertical, horizontal, and diagonal axes to the first occurance of yours

 ![Gameboard Array](https://i.imgur.com/INkjCpW.png)
 
4. Render updated state on the display
    - display new piece
    - remove current color class and apply the currentPlayer's class to affected pieces
    - update score count

 End Game  
  - you must play as long as you have a legal move
  - game play goes until no legal moves remain
 - it is possible for game to end without all squares being filled

Icebox Items:  
1. Game begins with an empty board and Player 1 selects his color  
2. If you hover over where you want to click for a certain amount of time, show a semi-transparent piece  
3. Make board larger  
4. Animation for pieces flipping
5. Indication of whose turn it is by color display



<!---[ 01, 02, 03, 04, 05, 06, 07, 08,
  09, 10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23, 24,
  25, 26, 27,\28, 29/, 30, 31, 32,
  33, 34, 35,\36, 37/, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48,
  49, 50, 51, 52, 53, 54, 55, 56, 
  57, 58, 59, 60, 61, 62, 63, 64 ] --->

Try starting with a 4 * 4 board or 6 * 6 board
