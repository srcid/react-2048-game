import { Board, emptyBlocks } from "../../src/utils/gameboard";

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
