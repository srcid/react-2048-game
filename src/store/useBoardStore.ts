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
import { pushIfNotEqualsTop } from "../utils/helpers";
import { Board } from "../utils/types";

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
    set((curState) => {
      console.log("useBoardStore:addNew: ", curState.boards);

      try {
        const newBoard = addNewNumberToBoard(curState.boards[0]);

        return {
          boards: [newBoard, ...curState.boards],
        };
      } catch (err) {
        console.log(err);
      }

      return curState;
    }),
  move: (move) => {
    if (movements[move]) {
      set((curState) => ({
        boards: pushIfNotEqualsTop(
          curState.boards,
          movements[move](curState.boards[0]),
        ),
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
