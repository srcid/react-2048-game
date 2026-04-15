import {
  addNewNumberToBoard,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
} from "../../src/utils/gameboard";

describe("2048 Board Movement Logic", () => {
  // Helper to create a fresh 4x4 board to ensure no mutation leaks between tests
  describe("moveLeft", () => {
    it("slides and merges elements to the left", () => {
      const input = [
        [2, 2, 0, 0],
        [2, 0, 2, 0],
        [4, 4, 4, 4],
        [0, 8, 0, 8],
      ];
      const expected = [
        [4, 0, 0, 0],
        [4, 0, 0, 0],
        [8, 8, 0, 0],
        [16, 0, 0, 0],
      ];
      expect(moveLeft(input)).toEqual(expected);
    });
  });

  describe("moveRight", () => {
    it("slides and merges elements to the right", () => {
      const input = [
        [0, 0, 2, 2],
        [2, 0, 2, 0],
        [4, 4, 4, 4],
        [8, 0, 8, 0],
      ];
      const expected = [
        [0, 0, 0, 4],
        [0, 0, 0, 4],
        [0, 0, 8, 8],
        [0, 0, 0, 16],
      ];
      expect(moveRight(input)).toEqual(expected);
    });

    it("slides and merges elements to the right with only the bottom row filled", () => {
      const input = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [4, 2, 2, 8],
      ];
      const expected = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 4, 4, 8],
      ];
      const expected2 = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 8, 8],
      ];
      const expected3 = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 16],
      ];

      expect(moveRight(input)).toEqual(expected);
      expect(moveRight(expected)).toEqual(expected2);
      expect(moveRight(expected2)).toEqual(expected3);
    });
  });

  describe("moveUp", () => {
    it("slides and merge elements upwards", () => {
      const input = [
        [2, 0, 0, 8],
        [2, 4, 0, 0],
        [0, 4, 2, 8],
        [0, 0, 2, 0],
      ];
      const expected = [
        [4, 8, 4, 16],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      expect(moveUp(input)).toEqual(expected);
    });
  });

  describe("moveDown", () => {
    it("slides and merges elements downwards", () => {
      const input = [
        [2, 0, 2, 0],
        [2, 4, 2, 0],
        [0, 4, 0, 8],
        [0, 0, 0, 8],
      ];
      const expected = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [4, 8, 4, 16],
      ];
      expect(moveDown(input)).toEqual(expected);
    });
  });

  describe("Edge Cases & Constraints", () => {
    it("returns a new array instance (immutability)", () => {
      const input = [
        [2, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];
      const result = moveLeft(input);

      expect(result).not.toBe(input); // Reference should be different
      expect(result[0]).not.toBe(input[0]); // Row references should be different
    });

    it('does not change a "locked" board (no possible moves)', () => {
      const lockedBoard = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2],
      ];
      expect(moveLeft(lockedBoard)).toEqual(lockedBoard);
      expect(moveUp(lockedBoard)).toEqual(lockedBoard);
    });

    it("handles an empty board", () => {
      const empty = Array(4)
        .fill(null)
        .map(() => Array(4).fill(0));
      expect(moveLeft(empty)).toEqual(empty);
    });
  });
});

describe("addNewNumberToBoard", () => {
  // Mock dependencies or helper functions if necessary
  // Assuming Board is number[][] and Pair is [number, number]

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("adds a specific value at a specific position", () => {
    const board = [
      [0, 0],
      [0, 0],
    ];
    const result = addNewNumberToBoard(board, [0, 1], 4);

    expect(result[0][1]).toBe(4);
    expect(result).not.toBe(board); // Check immutability (board.with creates a copy)
  });

  it("throws an error if the board is full", () => {
    const fullBoard = [
      [2, 4],
      [8, 16],
    ];
    // This assumes your emptyBlocks helper returns [] for this board
    expect(() => addNewNumberToBoard(fullBoard)).toThrow("Fulfilled board.");
  });

  it("throws an error if the specific position is already filled", () => {
    const board = [
      [2, 0],
      [0, 0],
    ];
    expect(() => addNewNumberToBoard(board, [0, 0], 4)).toThrow(
      "Position already filled.",
    );
  });

  it("throws an error if the value is not a power of two", () => {
    const board = [
      [0, 0],
      [0, 0],
    ];
    // Testing 3 (binary 11) or 6 (binary 110)
    expect(() => addNewNumberToBoard(board, [0, 0], 3)).toThrow(
      "Invalid value.",
    );
    expect(() => addNewNumberToBoard(board, [0, 0], 6)).toThrow(
      "Invalid value.",
    );
  });

  it("picks a random empty spot when no position is provided", () => {
    const board = [
      [2, 0],
      [2, 0],
    ];

    // Force Math.random to pick the second available empty block
    // emptiesBlocks would be [[0, 1], [1, 1]]
    vi.spyOn(Math, "random").mockReturnValue(0.99);

    const result = addNewNumberToBoard(board);

    expect([
      [
        [2, 4],
        [2, 0],
      ],
      [
        [2, 0],
        [2, 4],
      ],
    ]).toContainEqual(result);
  });

  it("uses a generated number if no value is provided", () => {
    const board = [[0]];
    // If you have a newNumber() utility, you might want to mock it.
    // Here we just check if the result is a number at the expected position.
    const result = addNewNumberToBoard(board, [0, 0]);
    expect(result[0][0]).toBeGreaterThan(0);
  });
});
