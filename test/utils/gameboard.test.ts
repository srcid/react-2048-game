import {
  Board,
  emptyBlocks,
  moveDown,
  moveLeft,
  moveRight,
  moveUp,
  slideAndMergeRowToLeft,
} from "../../src/utils/gameboard";

//emptyBlocks(board: Board): Pair[]
describe("EmptyBlocks", () => {
  describe("Generic matrices dimentions", () => {
    it("returns all coordinates containing 0 in a mixed board", () => {
      const board: Board = [
        [1, 0, 3],
        [0, 5, 6],
        [7, 8, 0],
      ];

      expect(emptyBlocks(board)).toEqual([
        [0, 1],
        [1, 0],
        [2, 2],
      ]);
    });

    it("returns empty array when there are no empty blocks", () => {
      const board: Board = [
        [1, 2],
        [3, 4],
      ];

      expect(emptyBlocks(board)).toEqual([]);
    });

    it("returns all positions when board is entirely empty", () => {
      const board: Board = [
        [0, 0],
        [0, 0],
      ];

      expect(emptyBlocks(board)).toEqual([
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
      ]);
    });

    it("returns empty array for an empty board", () => {
      const board: Board = [];

      expect(emptyBlocks(board)).toEqual([]);
    });

    it("handles single-row boards correctly", () => {
      const board: Board = [[0, 1, 0, 2]];

      expect(emptyBlocks(board)).toEqual([
        [0, 0],
        [0, 2],
      ]);
    });

    it("handles single-column boards correctly", () => {
      const board: Board = [[0], [1], [0]];

      expect(emptyBlocks(board)).toEqual([
        [0, 0],
        [2, 0],
      ]);
    });

    test("Empty board", () => {
      const input: Board = [];
      const expected: Board = [];

      expect(emptyBlocks(input)).toStrictEqual(expected);
    });
  });

  describe("emptyBlocks - 4x4 boards", () => {
    test("returns correct coordinates for most empty board", () => {
      const input = [
        [0, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 2, 4],
        [4, 0, 0, 4],
      ];

      const expected = [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 2],
        [1, 3],
        [2, 0],
        [2, 1],
        [3, 1],
        [3, 2],
      ];

      expect(emptyBlocks(input)).toStrictEqual(expected);
    });

    it("returns correct coordinates for mixed 4x4 board", () => {
      const board: Board = [
        [1, 0, 3, 4],
        [0, 6, 7, 0],
        [9, 10, 0, 12],
        [13, 14, 15, 0],
      ];

      expect(emptyBlocks(board)).toEqual([
        [0, 1],
        [1, 0],
        [1, 3],
        [2, 2],
        [3, 3],
      ]);
    });

    it("returns empty array when no zeros exist", () => {
      const board: Board = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ];

      expect(emptyBlocks(board)).toEqual([]);
    });

    it("returns all positions when entire 4x4 board is empty", () => {
      const board: Board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ];

      expect(emptyBlocks(board)).toEqual([
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [1, 0],
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [3, 0],
        [3, 1],
        [3, 2],
        [3, 3],
      ]);
    });

    it("returns only corner zeros correctly", () => {
      const board: Board = [
        [0, 2, 3, 0],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [0, 14, 15, 0],
      ];

      expect(emptyBlocks(board)).toEqual([
        [0, 0],
        [0, 3],
        [3, 0],
        [3, 3],
      ]);
    });
  });
});

describe("slideAndMergeRowToTheLeft", () => {
  describe("slideAndMergeRowToLeft - length of 4", () => {
    test("should slide and merge correctly", () => {
      // Basic sliding and merging
      expect(slideAndMergeRowToLeft([2, 2, 2, 2])).toEqual([4, 4, 0, 0]);
      expect(slideAndMergeRowToLeft([2, 0, 2, 0])).toEqual([4, 0, 0, 0]);
      expect(slideAndMergeRowToLeft([2, 4, 8, 8])).toEqual([2, 4, 16, 0]);
      expect(slideAndMergeRowToLeft([4, 4, 8, 8])).toEqual([8, 16, 0, 0]);

      // Handling non-mergable sequences
      expect(slideAndMergeRowToLeft([2, 4, 8, 16])).toEqual([2, 4, 8, 16]);

      // Handling leading/trailing zeros
      expect(slideAndMergeRowToLeft([0, 0, 2, 2])).toEqual([4, 0, 0, 0]);

      // The "Triple" case - 2048 rules state the merge happens from the direction of the slide
      expect(slideAndMergeRowToLeft([2, 2, 2, 0])).toEqual([4, 2, 0, 0]);
      expect(slideAndMergeRowToLeft([2, 2, 0, 2])).toEqual([4, 2, 0, 0]);
      expect(slideAndMergeRowToLeft([2, 0, 2, 2])).toEqual([4, 2, 0, 0]);

      // Empty case
      expect(slideAndMergeRowToLeft([0, 0, 0, 0])).toEqual([0, 0, 0, 0]);
    });
  });

  describe("slideAndMergeRowToLeft - Arbitrary Length", () => {
    test("should handle varying array sizes", () => {
      // Length 1
      expect(slideAndMergeRowToLeft([4])).toEqual([4]);

      // Length 3
      expect(slideAndMergeRowToLeft([2, 2, 4])).toEqual([4, 4, 0]);

      // Length 5
      expect(slideAndMergeRowToLeft([2, 0, 2, 2, 2])).toEqual([4, 4, 0, 0, 0]);

      // Length 8
      const longRow = [2, 2, 4, 4, 8, 8, 16, 16];
      const longResult = [4, 8, 16, 32, 0, 0, 0, 0];
      expect(slideAndMergeRowToLeft(longRow)).toEqual(longResult);
    });

    test("should maintain original array length", () => {
      const lengths = [0, 1, 5, 10, 100];
      lengths.forEach((len) => {
        const input = Array(len).fill(2);
        expect(slideAndMergeRowToLeft(input).length).toBe(len);
      });
    });

    test("should handle empty input", () => {
      expect(slideAndMergeRowToLeft([])).toEqual([]);
    });
  });
});

describe("2048 Board Movement Logic", () => {
  // Helper to create a fresh 4x4 board to ensure no mutation leaks between tests
  describe("moveLeft", () => {
    it("should slide and merge elements to the left", () => {
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
    it("should slide and merge elements to the right", () => {
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

    it("should slide and merge elements to the right with only the bottom row filled", () => {
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
      expect(moveRight(input)).toEqual(expected);
    });
  });

  describe("moveUp", () => {
    it("should slide and merge elements upwards", () => {
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
    it("should slide and merge elements downwards", () => {
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
    it("should return a new array instance (immutability)", () => {
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

    it('should not change a "locked" board (no possible moves)', () => {
      const lockedBoard = [
        [2, 4, 2, 4],
        [4, 2, 4, 2],
        [2, 4, 2, 4],
        [4, 2, 4, 2],
      ];
      expect(moveLeft(lockedBoard)).toEqual(lockedBoard);
      expect(moveUp(lockedBoard)).toEqual(lockedBoard);
    });

    it("should handle an empty board", () => {
      const empty = Array(4)
        .fill(null)
        .map(() => Array(4).fill(0));
      expect(moveLeft(empty)).toEqual(empty);
    });
  });
});
