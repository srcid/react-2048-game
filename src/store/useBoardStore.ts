import { create } from "zustand";
import {
  addNewNumberToBoard,
  Board,
  createBoard,
  moveDown,
  moveLeft,
  movements,
  moveRight,
  moveUp,
} from "../utils/gameboard";

interface IUseBoardStore {
  boards: Array<Board>;
  moveLeft: VoidFunction;
  moveRight: VoidFunction;
  moveUp: VoidFunction;
  moveDown: VoidFunction;
  addNew: VoidFunction;
  move: (move: keyof typeof movements) => void;
  undo: VoidFunction;
}

export const useBoardStore = create<IUseBoardStore>((set) => ({
  boards: [createBoard()],
  moveLeft: () =>
    set((curState) => ({ boards: [moveLeft(curState.boards[0]), ...curState.boards]})),
  moveRight: () =>
    set((curState) => ({
      boards: [moveRight(curState.boards[0]), ...curState.boards],
    })),
  moveUp: () =>
    set((curState) => ({
      boards: [moveUp(curState.boards[0]), ...curState.boards],
    })),
  moveDown: () =>
    set((curState) => ({
      boards: [moveDown(curState.boards[0]), ...curState.boards],
    })),
  addNew: () =>
    set((curState) => ({
      boards: [addNewNumberToBoard(curState.boards[0]), ...curState.boards],
    })),
  move: (move) => {
    if (movements[move]) {
      set((curState) => ({
        boards: [movements[move](curState.boards[0]), ...curState.boards],
      }));
    }
  },
  undo: () =>
    set((curState) => ({
      boards:
        curState.boards.length >= 2
          ? curState.boards.slice(1)
          : curState.boards,
    })),
}));

