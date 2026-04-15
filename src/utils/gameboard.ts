import "./extensions";
import { pipe } from "./functional";
import { emptyBlocks, newNumber } from "./helpers";
import { Board, Pair } from "./types";

export function createBoard(): Board {
  let board = Array(4).fill(Array(4).fill(0)); // generate empty board;
  board = pipe(addNewNumberToBoard, addNewNumberToBoard)(board);

  return board;
}

export function addNewNumberToBoard(
  board: Board,
  pos?: Pair,
  val?: number,
): Board {
  const emptiesBlocks = emptyBlocks(board);

  if (emptiesBlocks.length === 0) {
    throw new Error("Fulfilled board.");
  }

  const emptiesBlocksRandomIdx = Math.floor(
    Math.random() * emptiesBlocks.length,
  );
  const [i, j] = pos ?? emptiesBlocks[emptiesBlocksRandomIdx];
  const x = val ?? newNumber();

  // case position passed was not free.
  if (pos !== undefined && board[i][j] != 0) {
    throw new Error("Position already filled.");
  }

  // case value passed was not a power of two.
  if (
    val !== undefined &&
    x
      .toString(2)
      .split("")
      .filter((e) => e === "1")?.length !== 1
  ) {
    throw new Error("Invalid value.");
  }

  return board.with(i, board[i].with(j, x));
}

/**
 * slide non-zero elements to the left, and them together on the left, in pairs, that are next to each other.
 *
 * @param row
 * @returns slided and merged new row
 */
export function slideAndMergeRowToLeft(row: number[]): number[] {
  let filtered = row.filter((value) => value !== 0);

  for (let i = 0; i < filtered.length - 1; i++) {
    if (filtered[i] === filtered[i + 1]) {
      filtered[i] *= 2;
      filtered[i + 1] = 0;
      i++;
    }
  }

  filtered = filtered.filter((value) => value !== 0);

  return [...filtered, ...Array(row.length - filtered.length).fill(0)];
}

export function moveLeft(board: Board): Board {
  console.log("Moving left.");
  return board.map((row) => slideAndMergeRowToLeft(row));
}

export function moveRight(board: Board): Board {
  console.log("Moving right.");
  return board.map((row) =>
    slideAndMergeRowToLeft(row.toReversed()).toReversed(),
  );
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
    .map((row) => slideAndMergeRowToLeft(row.toReversed()).toReversed())
    .transpose();
}

export const movements = {
  ArrowLeft: moveLeft,
  ArrowRight: moveRight,
  ArrowUp: moveUp,
  ArrowDown: moveDown,
};
