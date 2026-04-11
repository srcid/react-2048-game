import { useBoardStore } from "../../src/store/useBoardStore"; // adjust path
import * as gameboard from "../../src/utils/gameboard";

// Mock the utilities
vi.mock("../utils/gameboard", () => ({
  createBoard: vi.fn(() => [
    [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 2, 4],
      [4, 0, 0, 4],
    ],
  ]),
}));

describe("useBoardStore", () => {
  // Reset the store state before each test
  beforeEach(() => {
    const initialState = { boards: [gameboard.createBoard()] };
    useBoardStore.setState(initialState);
    vi.clearAllMocks();
  });

  it("should initialize with a single board", () => {
    const state = useBoardStore.getState();
    const expectedInitialBoard = [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 2, 4],
      [4, 0, 0, 4],
    ];
    expect(state.boards).toHaveLength(1);
    expect(state.boards[0]).toEqual(expectedInitialBoard);
  });

  it("should handle moveDown correctly", () => {
    const spy = vi.spyOn(gameboard, "moveDown");

    useBoardStore.getState().moveDown();
    const state = useBoardStore.getState();
    const movedDown = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 2, 2, 8],
    ];

    expect(state.boards[0]).toEqual(movedDown);
    expect(spy).toHaveBeenCalled();
  });

  it("should handle moveUp correctly", () => {
    const spy = vi.spyOn(gameboard, "moveUp");

    useBoardStore.getState().moveUp();
    const state = useBoardStore.getState();
    const movedUp = [
      [4, 2, 2, 8],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    expect(state.boards[0]).toEqual(movedUp);
    expect(spy).toHaveBeenCalled();
  });

  it("should handle moveLeft correctly", () => {
    const spy = vi.spyOn(gameboard, "moveLeft");

    useBoardStore.getState().moveLeft();
    const state = useBoardStore.getState();
    const movedLeft = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 4, 0, 0],
      [8, 0, 0, 0],
    ];

    expect(state.boards[0]).toEqual(movedLeft);
    expect(spy).toHaveBeenCalled();
  });

  it("should handle moveRight correctly", () => {
    const spy = vi.spyOn(gameboard, "moveRight");

    useBoardStore.getState().moveRight();
    const state = useBoardStore.getState();
    const movedRight = [
      [0, 0, 0, 0],
      [0, 0, 0, 2],
      [0, 0, 2, 4],
      [0, 0, 0, 8],
    ];

    expect(state.boards[0]).toEqual(movedRight);
    expect(spy).toHaveBeenCalled();
  });
});
