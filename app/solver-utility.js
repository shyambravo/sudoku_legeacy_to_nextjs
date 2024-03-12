function isValidMove(board, row, col, num) {
  // Check if the number is already in the row or column
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false;
    }
  }

  // Check if the number is already in the 3x3 grid
  const startRow = 3 * Math.floor(row / 3);
  const startCol = 3 * Math.floor(col / 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }

  return true;
}

function findEmptyCell(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }
  return null; // No empty cell found
}

function solve(board) {
  const emptyCell = findEmptyCell(board);

  if (!emptyCell) {
    // Puzzle solved
    return true;
  }

  const [row, col] = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValidMove(board, row, col, num)) {
      // Try placing the number
      board[row][col] = num;

      // Recursively solve the remaining puzzle
      if (solve(board)) {
        return true; // If a solution is found, stop the loop
      }

      // If the current assignment does not lead to a solution, backtrack
      board[row][col] = 0;
    }
  }

  return false; // No solution found
}

function isValidSudoku(board) {
  let set = new Set()
  
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
          const value = board[i][j]
          if (value !== 0) {
              const row = `${value} at row ${i}`
              const column = `${value} at column ${j}`
              const box = `${value} at box ${Math.floor(i/3)}, ${Math.floor(j/3)}`
              console.log(`${row}, ${column}, ${box}`)
              if (set.has(row) || set.has(column) || set.has(box)) {
                  return false
              } else {
                  set.add(row)
                  set.add(column)
                  set.add(box)
              }
          }
      }
  }

  return true
};

function generateRandomNumber() {
  let num = 9;

  while (num === 9) {
    num = parseInt(Math.random() * 10);
  }

  return num;
}

function insertEmpty(board, difficulty) {
  // Based on the difficulty the board values will be emptied

  let buffer = 4;

  if (difficulty === "2") {
    buffer = 5;
  } else if (difficulty === "3") {
    buffer = 6;
  }

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < buffer; col++) {
      let colIndex = generateRandomNumber();
      board[row][colIndex] = 0;
    }
  }

  return board;
}

const generateRandoms = () => {
  // Generate random numbers for four corners

  const boardArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  boardArr[0][0] = parseInt(Math.random() * 10);

  solve(boardArr);

  return boardArr;
};

export { solve, insertEmpty, generateRandoms, isValidSudoku };
