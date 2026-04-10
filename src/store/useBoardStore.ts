import { create } from "zustand";
import {
  addNewNumberToBoard,
  createBoard,
  moveDown,
  moveLeft,
  movements,
  moveRight,
  moveUp,
} from "../utils/gameboard";
import { Board } from "../utils/types";
import { pushIfNotEqualsTop } from "../utils/helpers";

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
    set((curState) => ({
      boards: pushIfNotEqualsTop(curState.boards, moveLeft(curState.boards[0])),
    })),
  moveRight: () =>
    set((curState) => ({
      boards: pushIfNotEqualsTop(
        curState.boards,
        moveRight(curState.boards[0]),
      ),
    })),
  moveUp: () =>
    set((curState) => ({
      boards: pushIfNotEqualsTop(curState.boards, moveUp(curState.boards[0])),
    })),
  moveDown: () =>
    set((curState) => ({
      boards: pushIfNotEqualsTop(curState.boards, moveDown(curState.boards[0])),
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
