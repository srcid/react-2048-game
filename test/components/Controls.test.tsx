/**
 * @vitest-environment jsdom
 */

import "@testing-library/jest-dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import Controls from "../../src/components/Controls";
import { useBoardStore } from "../../src/store/useBoardStore";
import * as gameboard from "../../src/utils/gameboard";

const initialBoard = [
  [0, 0, 0, 0],
  [0, 2, 0, 0],
  [0, 0, 2, 4],
  [4, 0, 0, 4],
];

// Mock the utilities
vi.mock("../../src/utils/gameboard", async (realGameboard) => {
  const actual =
    await realGameboard<typeof import("../../src/utils/gameboard")>();

  return {
    ...actual,
    createBoard: vi.fn(() => [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 2, 4],
      [4, 0, 0, 4],
    ]),
  };
});

describe("Controls", () => {
  beforeEach(() => {
    const initialState = { boards: [gameboard.createBoard()] };
    useBoardStore.setState(initialState);
    vi.clearAllMocks();
    cleanup();
  });

  it("swipes the up", () => {
    const { container } = render(<Controls id="test-ctrl"></Controls>);
    const btnUp = container.querySelector("#test-ctrl-btn-up");

    expect(btnUp).not.toBeNull(); // the id do exists

    fireEvent.click(btnUp as Element);

    const state = useBoardStore.getState();
    const expectedTopBoard = [
      [4, 2, 2, 8],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    expect(state.boards.length).toStrictEqual(2);
    expect(state.boards[0]).toStrictEqual(expectedTopBoard);
    expect(state.boards[1]).toStrictEqual(initialBoard); // initial board shouldn't be changed
  });

  it("swipes the down", () => {
    const { container } = render(<Controls id="test-ctrl"></Controls>);
    const btnDown = container.querySelector("#test-ctrl-btn-down");

    expect(btnDown).not.toBeNull(); // the id do exists

    fireEvent.click(btnDown as Element);

    const state = useBoardStore.getState();
    const expectedTopBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 2, 2, 8],
    ];

    expect(state.boards.length).toStrictEqual(2);
    expect(state.boards[0]).toStrictEqual(expectedTopBoard);
    expect(state.boards[1]).toStrictEqual(initialBoard); // initial board shouldn't be changed
  });
  it("swipes the left", () => {
    const { container } = render(<Controls id="test-ctrl"></Controls>);
    const btnLeft = container.querySelector("#test-ctrl-btn-left");

    expect(btnLeft).not.toBeNull(); // the id do exists

    fireEvent.click(btnLeft as Element);

    const state = useBoardStore.getState();
    const expectedTopBoard = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 4, 0, 0],
      [8, 0, 0, 0],
    ];

    expect(state.boards.length).toStrictEqual(2);
    expect(state.boards[0]).toStrictEqual(expectedTopBoard);
    expect(state.boards[1]).toStrictEqual(initialBoard); // initial board shouldn't be changed
  });
  it("swipes the right", () => {
    const { container } = render(<Controls id="test-ctrl"></Controls>);
    const btnRight = container.querySelector("#test-ctrl-btn-right");

    expect(btnRight).not.toBeNull(); // the id do exists

    fireEvent.click(btnRight as Element);

    const state = useBoardStore.getState();
    const expectedTopBoard = [
      [0, 0, 0, 0],
      [0, 0, 0, 2],
      [0, 0, 2, 4],
      [0, 0, 0, 8],
    ];

    expect(state.boards.length).toStrictEqual(2);
    expect(state.boards[0]).toStrictEqual(expectedTopBoard);
    expect(state.boards[1]).toStrictEqual(initialBoard); // initial board shouldn't be changed
  });
  it.todo("adds new number to board");
  it.todo("retores to previus state of the game");
});
