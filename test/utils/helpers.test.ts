import {
  emptyBlocks,
  ndArrCmp,
  newNumber,
  pushIfNotEqualsTop,
  slideAndMergeRowToLeft,
} from "../../src/utils/helpers";
import { Board } from "../../src/utils/types";

describe("ndArrCmp", () => {
  it("returns true for two empty arrays", () => {
    expect(ndArrCmp([], [])).toBe(true);
  });

  it("returns false for arrays of different lengths", () => {
    expect(ndArrCmp([1, 2], [1, 2, 3])).toBe(false);
  });

  it("returns true for identical flat arrays", () => {
    expect(ndArrCmp([1, "a", true], [1, "a", true])).toBe(true);
  });

  it("returns false for different flat arrays", () => {
    expect(ndArrCmp([1, 2], [1, 3])).toBe(false);
  });

  it("returns true for deeply nested identical arrays", () => {
    const arr1 = [1, [2, [3, 4]], 5];
    const arr2 = [1, [2, [3, 4]], 5];
    expect(ndArrCmp(arr1, arr2)).toBe(true);
  });

  it("returns false if nested structures differ", () => {
    const arr1 = [1, [2, [3, 4]], 5];
    const arr2 = [1, [2, [3, 99]], 5];
    expect(ndArrCmp(arr1, arr2)).toBe(false);
  });

  it("returns false when comparing an array to a non-array element", () => {
    // Casting to any to test the runtime logic against mixed types
    expect(ndArrCmp([1, [2]], [1, 2])).toBe(false);
  });

  it("returns false when comparing 4x4 matrix with similar elements", () => {
    const arr1 = [
      [0, 0, 0, 0],
      [0, 2, 0, 0],
      [0, 0, 2, 4],
      [4, 0, 0, 4],
    ];

    const arr2 = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [4, 2, 2, 8],
    ];

    expect(ndArrCmp(arr1, arr2)).toBe(false);
  });
});

describe("pushIfNotEqualsTop", () => {
  // Mocking a Board as a 2D array for these tests
  const boardA: Board = [
    [0, 1],
    [1, 0],
  ];
  const boardB: Board = [
    [1, 1],
    [1, 1],
  ];

  it("adds a new board to the front if it differs from the current top", () => {
    const history: Board[] = [boardA];
    const result = pushIfNotEqualsTop(history, boardB);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(boardB);
    expect(result[1]).toEqual(boardA);
  });

  it("does not add the board if it is identical to the current top", () => {
    const history: Board[] = [boardA];
    const sameBoard: Board = [
      [0, 1],
      [1, 0],
    ]; // Deeply equal but different reference

    const result = pushIfNotEqualsTop(history, sameBoard);

    expect(result).toHaveLength(1);
    expect(result).toBe(history); // Should return original array reference
  });

  it('handles the "empty history" edge case', () => {
    const history: Board[] = [];

    // In the current implementation, this might throw an error
    // because ndArrCmp(boards[0], newBoard) will pass undefined to .length
    expect(() => pushIfNotEqualsTop(history, boardA)).toThrow();
  });
});

describe("newNumber", () => {
  it.each([0.1, 0.5, 0.7, 0.79, 0.8])(
    "returns 2 if math.random return less then or equals 0.8",
    (random) => {
      const mathRandomMock = vi.spyOn(Math, "random");
      mathRandomMock.mockReturnValueOnce(random);

      const n = newNumber();

      expect(n).toStrictEqual(2);
    },
  );

  it.each([0.8001, 0.81, 0.9, 0.99, 1])(
    "returns 4 if math.random return more than 0.8",
    (random) => {
      const mathRandomMock = vi.spyOn(Math, "random");
      mathRandomMock.mockReturnValueOnce(random);

      const n = newNumber();

      expect(n).toStrictEqual(4);
    },
  );

  test("returns about 80% of 2 and about of 20% 4", () => {
    const N = 100_000;
    const DELTA = 0.05;
    const EXPECTED_DIST_OF_2 = 0.8;
    const EXPECTED_DIST_OF_4 = 0.2;

    let count2 = 0;
    let count4 = 0;

    for (let i = 0; i < N; i++) {
      const value = newNumber();
      if (value === 2) count2++;
      else if (value === 4) count4++;
    }

    const ratio2 = count2 / N;
    const ratio4 = count4 / N;

    console.log("radio2: ", ratio2);
    console.log("radio4: ", ratio4);

    expect(ratio2).toBeGreaterThan(EXPECTED_DIST_OF_2 - DELTA);
    expect(ratio2).toBeLessThan(EXPECTED_DIST_OF_2 + DELTA);

    expect(ratio4).toBeGreaterThan(EXPECTED_DIST_OF_4 - DELTA);
    expect(ratio4).toBeLessThan(EXPECTED_DIST_OF_4 + DELTA);
  });
});

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

    it("returns an empty board when given an empty board", () => {
      const input: Board = [];
      const expected: Board = [];

      expect(emptyBlocks(input)).toStrictEqual(expected);
    });

    it("throws an error if undefined was passed as board", () => {
      // @ts-expect-error undefined can maybe passed at runtime
      expect(() => emptyBlocks(undefined)).toThrow("Board can't be undefined.");
    });
  });

  describe("emptyBlocks - 4x4 boards", () => {
    it("returns correct coordinates for most empty board", () => {
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
    it("slides and merges correctly", () => {
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
    it("handles varying array sizes", () => {
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

    it("maintains original array length", () => {
      const lengths = [0, 1, 5, 10, 100];
      lengths.forEach((len) => {
        const input = Array(len).fill(2);
        expect(slideAndMergeRowToLeft(input).length).toBe(len);
      });
    });

    it("handles empty input", () => {
      expect(slideAndMergeRowToLeft([])).toEqual([]);
    });
  });
});
