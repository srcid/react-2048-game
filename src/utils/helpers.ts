import { Board, NDArray, Pair } from "./types";

/**
 * Recursively compares two N-dimensional arrays for deep equality.
 */
export function ndArrCmp<T>(arr1: NDArray<T>, arr2: NDArray<T>): boolean {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    const valA = arr1[i];
    const valB = arr2[i];

    const isArrA = Array.isArray(valA);
    const isArrB = Array.isArray(valB);

    if (isArrA !== isArrB) return false;

    if (isArrA && isArrB) {
      if (!ndArrCmp(valA as NDArray<T>, valB as NDArray<T>)) {
        return false;
      }
    } else {
      if (valA !== valB) {
        return false;
      }
    }
  }

  return true;
}

export function pushIfNotEqualsTop(boards: Board[], newBoard: Board) {
  if (!ndArrCmp(boards[0], newBoard)) {
    return [newBoard, ...boards];
  }

  return boards;
}

/**
 * 80% of returing 2 and 20% of returing 4
 *
 * @returns 2 or 4
 */
export function newNumber(): number {
  return Math.random() <= 0.8 ? 2 : 4;
}

/**
 * Return the empty blocks of the given board
 *
 * @param board
 * @returns Pair of indexes i,j which contains 0
 */
export function emptyBlocks(board: Board): Pair[] {
  const arr: Pair[] = [];

  if (board === undefined) {
    throw new Error("Board can't be undefined.");
  }

  board.forEach((row, rowIdx) => {
    row.forEach((e, eIdx) => {
      if (e === 0) {
        arr.push([rowIdx, eIdx]);
      }
    });
  });

  return arr;
}
