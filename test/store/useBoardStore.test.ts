import { useBoardStore } from "../../src/store/useBoardStore"; // adjust path
import * as gameboard from "../../src/utils/gameboard";

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

  describe("movements", () => {
    beforeAll(() => {
      const spyAddNewNumberToBoard = vi.spyOn(gameboard, "addNewNumberToBoard");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      spyAddNewNumberToBoard.mockImplementation((board, pos, val) => board);

      return () => {
        spyAddNewNumberToBoard.mockReset();
      };
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

    it.each(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"] as const)(
      "handles move by $s arrow key",
      (moveKey) => {
        const spyMoveUp = vi.spyOn(gameboard.movements, "ArrowUp");
        const spyMoveDown = vi.spyOn(gameboard.movements, "ArrowDown");
        const spyMoveLeft = vi.spyOn(gameboard.movements, "ArrowLeft");
        const spyMoveRight = vi.spyOn(gameboard.movements, "ArrowRight");
        const state = useBoardStore.getState();
        const spyMove = vi.spyOn(state, "move");

        state.move(moveKey);

        expect(spyMove).toHaveBeenCalled();

        switch (moveKey) {
          case "ArrowUp":
            expect(spyMoveUp).toHaveBeenCalledAfter(spyMove);
            break;
          case "ArrowDown":
            expect(spyMoveDown).toHaveBeenCalledAfter(spyMove);
            break;
          case "ArrowLeft":
            expect(spyMoveLeft).toHaveBeenCalledAfter(spyMove);
            break;
          case "ArrowRight":
            expect(spyMoveRight).toHaveBeenCalledAfter(spyMove);
            break;
        }
      },
    );

    it.each([
      "Enter",
      "Escape",
      "Tab",
      " ",
      "Backspace",
      "Delete",
      "Home",
      "End",
      "PageUp",
      "PageDown",
      "Insert",
      "a",
      "A",
      "1",
      "!",
      "ShiftLeft",
      "ControlLeft",
      "AltLeft",
      "MetaLeft",
      "F1",
      "F12",
    ] as const)(
      "does not trigger any movement for incorrect key $s",
      (invalidKey) => {
        const spyMoveUp = vi.spyOn(gameboard.movements, "ArrowUp");
        const spyMoveDown = vi.spyOn(gameboard.movements, "ArrowDown");
        const spyMoveLeft = vi.spyOn(gameboard.movements, "ArrowLeft");
        const spyMoveRight = vi.spyOn(gameboard.movements, "ArrowRight");

        const state = useBoardStore.getState();
        const spyMove = vi.spyOn(state, "move");

        // @ts-expect-error - intentionally passing invalid key to test runtime behavior
        state.move(invalidKey);

        expect(spyMove).toHaveBeenCalled();

        expect(spyMoveUp).not.toHaveBeenCalled();
        expect(spyMoveDown).not.toHaveBeenCalled();
        expect(spyMoveLeft).not.toHaveBeenCalled();
        expect(spyMoveRight).not.toHaveBeenCalled();
      },
    );
  });

  describe("Add new number to board", () => {
    it("adds new number to board", () => {
      const state = useBoardStore.getState();
      const spyAddNew = vi.spyOn(state, "addNew");
      const spyGameboardAddNew = vi.spyOn(gameboard, "addNewNumberToBoard");
      const n = state.boards[0].reduce(
        (acc, curRow) => acc + curRow.filter((e) => e !== 0).length,
        0,
      );

      state.addNew();

      const newState = useBoardStore.getState();

      const m = newState.boards[0].reduce(
        (acc, curRow) => acc + curRow.filter((e) => e !== 0).length,
        0,
      );

      expect(spyAddNew).toHaveBeenCalledOnce();
      expect(spyGameboardAddNew).toHaveBeenCalledOnce();
      expect(newState.boards.length).toBe(state.boards.length + 1);
      expect(m).toBe(n + 1);
    });

    it("does not add a new number to an fulfilled board", () => {
      useBoardStore.setState({
        boards: [
          [
            [16, 32, 128, 256],
            [4, 2, 4, 2],
            [512, 1024, 2, 4],
            [4, 2, 2, 4],
          ],
        ],
      });

      const state = useBoardStore.getState();

      const spyAddNew = vi.spyOn(state, "addNew");
      const spyGameboardAddNew = vi.spyOn(gameboard, "addNewNumberToBoard");

      const n = state.boards[0].reduce(
        (acc, curRow) => acc + curRow.filter((e) => e !== 0).length,
        0,
      );

      state.addNew();

      const newState = useBoardStore.getState();

      const m = newState.boards[0].reduce(
        (acc, curRow) => acc + curRow.filter((e) => e !== 0).length,
        0,
      );

      expect(spyAddNew).toHaveBeenCalledOnce();
      expect(spyGameboardAddNew.mock.results[0].type).toBe("throw");
      expect(spyGameboardAddNew.mock.results[0].value.message).toBe(
        "Fulfilled board.",
      );
      expect(newState.boards.length).toBe(state.boards.length);
      expect(m).toBe(n);
    });
  });

  describe("undoing", () => {
    it("does not undo when there is only one single board in history", () => {
      const state = useBoardStore.getState();
      state.undo();
      const newState = useBoardStore.getState();

      expect(newState.boards).toStrictEqual(state.boards);
    });

    it("does undo when there is more than one board in hishtory", () => {
      const prev = [
        [0, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 2, 4],
        [4, 0, 0, 4],
      ];
      const cur = [
        [0, 0, 0, 0],
        [0, 0, 0, 2],
        [0, 0, 2, 4],
        [0, 0, 0, 8],
      ];

      useBoardStore.setState({
        boards: [cur, prev],
      });

      const state = useBoardStore.getState();

      state.undo();

      const newState = useBoardStore.getState();

      expect(newState.boards).toStrictEqual([prev]);
    });
  });
});
