import { Board } from "./types";

export function ndArrCmp<T>(arr1: T[], arr2: T[]): boolean {
  const n = arr1.length;
  const m = arr2.length;

  if (n !== m) return false;

  for (let i = 0; i < n; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i]))
      return ndArrCmp(arr1[i] as T[], arr2[i] as T[]);
    else if (arr1[i] !== arr2[i]) {
      return false;
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
