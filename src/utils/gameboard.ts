export type Board = number[][];
export type Pair = [number, number];

export function createBoard(): Board {
  let board = Array(4).fill(Array(4).fill(0));
  board = addNewNumberToBoard(board);
  board = addNewNumberToBoard(board);

  return board;
}

function newNumber(): number {
  return Math.random() <= 0.8 ? 2 : 4;
}

function emptyBlocks(board: Board): Pair[] {
  const arr = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === 0) arr.push([i,j] as Pair)
    }
  }

  return arr;
}

export function addNewNumberToBoard(board: Board): Board {
  console.log("Add new number to board");
  const emptiesBlocks = emptyBlocks(board);
  
  if (emptiesBlocks.length === 0) return board;
  
  const emptiesBlocksRandomIdx = Math.floor(Math.random() * emptiesBlocks.length);
  const [i, j] = emptiesBlocks[emptiesBlocksRandomIdx];

  return board.with(i, board[i].with(j, newNumber()));
}

function slideAndMergeRowToLeft(row: number[]): number[] {
  let filtered = row.filter((value) => value != 0);

  for (let i = 0; i < filtered.length-1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      filtered[i + 1] = 0;
      i++;
    }
  }

  filtered = filtered.filter((value) => value !== 0)

  return [...filtered, ...Array(4 - filtered.length).fill(0)];
}

export function moveLeft(board: Board): Board {
  console.log("Moving left.");
  return board.map((row) => slideAndMergeRowToLeft(row));
}

export function moveRight(board: Board): Board {
  console.log("Moving right.");
  return board.map((row) => slideAndMergeRowToLeft(row.reverse()).reverse());
}

export function moveUp(board: Board): Board {
  console.log("Moving up.");
  return board
    .transpose()
    .map((row) => slideAndMergeRowToLeft(row))
    .transpose();
}

export function moveDown(board: Board): Board {
  console.log("Moving down.");
  return board
    .transpose()
    .map((row) => slideAndMergeRowToLeft(row.reverse()).reverse())
    .transpose()
}

export const movements = {
  ArrowLeft: moveLeft,
  ArrowRight: moveRight,
  ArrowUp: moveUp,
  ArrowDown: moveDown
}