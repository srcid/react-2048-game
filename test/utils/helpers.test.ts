import { ndArrCmp, pushIfNotEqualsTop } from "../../src/utils/helpers";
import { Board } from "../../src/utils/types";

describe("ndArrCmp", () => {
  test("should return true for two empty arrays", () => {
    expect(ndArrCmp([], [])).toBe(true);
  });

  test("should return false for arrays of different lengths", () => {
    expect(ndArrCmp([1, 2], [1, 2, 3])).toBe(false);
  });

  test("should return true for identical flat arrays", () => {
    expect(ndArrCmp([1, "a", true], [1, "a", true])).toBe(true);
  });

  test("should return false for different flat arrays", () => {
    expect(ndArrCmp([1, 2], [1, 3])).toBe(false);
  });

  test("should return true for deeply nested identical arrays", () => {
    const arr1 = [1, [2, [3, 4]], 5];
    const arr2 = [1, [2, [3, 4]], 5];
    expect(ndArrCmp(arr1, arr2)).toBe(true);
  });

  test("should return false if nested structures differ", () => {
    const arr1 = [1, [2, [3, 4]], 5];
    const arr2 = [1, [2, [3, 99]], 5];
    expect(ndArrCmp(arr1, arr2)).toBe(false);
  });

  test("should return false when comparing an array to a non-array element", () => {
    // Casting to any to test the runtime logic against mixed types
    expect(ndArrCmp([1, [2]], [1, 2])).toBe(false);
  });

  test("should return false when comparing 4x4 matrix with similar elements", () => {
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

  test("should add a new board to the front if it differs from the current top", () => {
    const history: Board[] = [boardA];
    const result = pushIfNotEqualsTop(history, boardB);

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(boardB);
    expect(result[1]).toEqual(boardA);
  });

  test("should not add the board if it is identical to the current top", () => {
    const history: Board[] = [boardA];
    const sameBoard: Board = [
      [0, 1],
      [1, 0],
    ]; // Deeply equal but different reference

    const result = pushIfNotEqualsTop(history, sameBoard);

    expect(result).toHaveLength(1);
    expect(result).toBe(history); // Should return original array reference
  });

  test("should handle the 'empty history' edge case", () => {
    // Note: See 'A Quick Heads-up' below regarding this specific test
    const history: Board[] = [];

    // In the current implementation, this might throw an error
    // because ndArrCmp(boards[0], newBoard) will pass undefined to .length
    expect(() => pushIfNotEqualsTop(history, boardA)).toThrow();
  });
});
