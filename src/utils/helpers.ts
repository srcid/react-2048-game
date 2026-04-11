import { Board, NDArray } from "./types";

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
