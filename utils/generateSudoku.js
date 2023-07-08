function solveSudoku(board) {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        return true;
    }

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, row, col, num)) {
            board[row][col] = num;

            if (solveSudoku(board)) {
                return true; // Found a solution
            }

            board[row][col] = 0; // Undo the move
        }
    }

    return false; // No solution found
}

function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null; // No empty cell found
}

function isValidMove(board, row, col, num) {
  // Check row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) {
            return false;
        }
    }

    // Check column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] === num) {
            return false;
        }
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = boxRow; i < boxRow + 3; i++) {
        for (let j = boxCol; j < boxCol + 3; j++) {
            if (board[i][j] === num) {
                return false;
            }
        }
    }

    return true;
}

function generateRandomSudokuBoard() {
  const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  const a = Math.floor(Math.random() * 9) + 1;
  board[0][0] = a;
  board[0][Math.floor(Math.random() * 9)] = (a + 1)%9 +1;
  board[Math.floor(Math.random() * 9)][Math.floor(Math.random() * 9)] = (a+2)%9 +1;
  solveSudoku(board);

  return board;
}

function generateMask(board){
  for (let i = 0; i < 45; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    board[row][col] = '';
  }
  return board;
}

function generateSudoku(){
    let sudokuBoard = generateRandomSudokuBoard();
    let maskedBoard = JSON.parse(JSON.stringify(sudokuBoard));
    maskedBoard = generateMask(maskedBoard);
    return [sudokuBoard,maskedBoard];
}

export default generateSudoku;