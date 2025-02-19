import { create } from "zustand";
import { addNewNumberToBoard, Board, createBoard, moveDown, moveLeft, movements, moveRight, moveUp } from "../utils/gameboard";

interface IUseBoardStore {
  board: Board;
  moveLeft: VoidFunction;
  moveRight: VoidFunction;
  moveUp: VoidFunction;
  moveDown: VoidFunction;
  addNew: VoidFunction;
  move: (move: keyof typeof movements) => void;
}

export const useBoardStore = create<IUseBoardStore>((set) => ({
  board: createBoard(),
  moveLeft: () => set((curState) => ({ board: moveLeft(curState.board) })),
  moveRight: () => set((curState) => ({ board: moveRight(curState.board) })),
  moveUp: () => set((curState) => ({ board: moveUp(curState.board) })),
  moveDown: () => set((curState) => ({ board: moveDown(curState.board) })),
  addNew: () =>
    set((curState) => ({ board: addNewNumberToBoard(curState.board) })),
  move: (move) => {
    if (movements[move]) {
      set((curState) => ({ board: movements[move](curState.board) }));
    }
  },
}));

