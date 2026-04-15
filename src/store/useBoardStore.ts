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
import { ndArrCmp } from "../utils/helpers";
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
    set((curState) => {
      const hist = curState.boards;
      const top = hist[0];
      const newBoard = moveLeft(top);
      const haveChanged = !ndArrCmp(top, newBoard);

      if (haveChanged) {
        const newBoarWithNewNumber = addNewNumberToBoard(newBoard);

        return {
          boards: [newBoarWithNewNumber, ...hist],
        };
      }
      return curState;
    }),
  moveRight: () =>
    set((curState) => {
      const hist = curState.boards;
      const top = hist[0];
      const newBoard = moveRight(top);
      const haveChanged = !ndArrCmp(top, newBoard);

      if (haveChanged) {
        const newBoarWithNewNumber = addNewNumberToBoard(newBoard);

        return {
          boards: [newBoarWithNewNumber, ...hist],
        };
      }
      return curState;
    }),
  moveUp: () =>
    set((curState) => {
      const hist = curState.boards;
      const top = hist[0];
      const newBoard = moveUp(top);
      const haveChanged = !ndArrCmp(top, newBoard);

      if (haveChanged) {
        const newBoarWithNewNumber = addNewNumberToBoard(newBoard);

        return {
          boards: [newBoarWithNewNumber, ...hist],
        };
      }
      return curState;
    }),
  moveDown: () =>
    set((curState) => {
      const hist = curState.boards;
      const top = hist[0];
      const newBoard = moveDown(top);
      const haveChanged = !ndArrCmp(top, newBoard);

      if (haveChanged) {
        const newBoarWithNewNumber = addNewNumberToBoard(newBoard);

        return {
          boards: [newBoarWithNewNumber, ...hist],
        };
      }
      return curState;
    }),
  addNew: () =>
    set((curState) => {
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
    if (move in movements) {
      set((curState) => {
        const hist = curState.boards;
        const top = hist[0];
        const newBoard = movements[move](top);
        const haveChanged = !ndArrCmp(top, newBoard);

        if (haveChanged) {
          const newBoarWithNewNumber = addNewNumberToBoard(newBoard);

          return {
            boards: [newBoarWithNewNumber, ...hist],
          };
        }
        return curState;
      });
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
