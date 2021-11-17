/** Connect Four *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie) */

 const WIDTH = 7;
 const HEIGHT = 6; 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])  */
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
 function makeBoard() {
    for (let i = 0; i < HEIGHT; i++) {
      board[i] = [];
      for (let j = 0; j < WIDTH; j++) {
        board[i][j] = null;
      }
    }
    //per Calvin, use fill method for arrays to fill the board.
    // board = [
    //     [null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null],
    //     [null, null, null, null, null, null, null]
    // ]
    console.log(board);
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */ 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.querySelector('#board')
   // TODO: add comment for this code: 1) Created a new table row, added ID of column-top, added 'click' listener.
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   // TOP ROW: Created 7 table data cells, each appended to top row #top, each with index#. Appended top row #top to htmlBoard table board #board.
   for (let x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   // TODO: add comment for this code: 1) create y number of rows. 2) Create x number of cells. 3) Add id y-x to each cell. 4) Append each cell to the row. 5) Append that row to the htmlBoard. 6) Repeat for HEIGHT number of rows. 
   for (let y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
      //  cell.addEventListener('click', function() {
      //    console.log(`${y}-${x}`)
      //   });
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */ 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
   for (let i = HEIGHT - 1; i >= 0; i--) {
     if (board[i][x] === null) {
       return i;
     }
   }
   return null;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */ 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   const piece = document.createElement('div');
   piece.setAttribute('class', 'piece');
   piece.classList.add(`player${currPlayer}`);
  //  if (currPlayer === 1) {
  //    piece.setAttribute('class', 'player1');
  //  } else if (currPlayer === 2) {
  //    piece.setAttribute('class', 'player2');
  //  }
  //  piece.style.top = -50 * (y + 2); what does this mean/do? There is no 'px' to make it pixels.
   const pieceLocation = document.getElementById(`${y}-${x}`);
   pieceLocation.append(piece);
   
 }
 
 /** endGame: announce game end */ 
 function endGame(msg) {
   setTimeout ( () => {
     alert(msg)
   }, 500);
 }
 
 /** handleClick: handle click of column top to play piece */
 //Event listener is on entire top row, not each td. Each td has an id of x.
 function handleClick(evt) {
   // get x from ID of clicked cell
   const x = +evt.target.id; // .currentTarget would return the top row, not td
  //  console.log(evt.target)
 
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);

   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   board[y][x] = currPlayer;
   placeInTable(y, x);
   console.log(board[y][x])
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // TODO: check for tie: if all cells in board are filled, call endGame
   if ( [
     ...board[0], 
     ...board[1], 
     ...board[2], 
     ...board[3], 
     ...board[4], 
     ...board[5]
    ].every((val) => {
      return val !== null;
    }) ) {
      endGame('The game is a draw!');
    }

   // TODO: switch players: switch currPlayer 1 <-> 2
   currPlayer = currPlayer === 1 ? 2 : 1;
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */ 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // TODO: read and understand this code. Add comments to help you. 
   for (let y = 0; y < HEIGHT; y++) {
     for (let x = 0; x < WIDTH; x++) {
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 