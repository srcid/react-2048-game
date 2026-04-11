import "../../src/utils/extensions.ts";

describe("transpose extension", () => {
  it("transposes a square matrix", () => {
    const input = [
      [1, 2],
      [3, 4],
    ];

    const expected = [
      [1, 3],
      [2, 4],
    ];

    expect(input.transpose()).toStrictEqual(expected);
  });

  it("transposes a rectangular matrix (more rows than columns)", () => {
    const input = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const expected = [
      [1, 3, 5],
      [2, 4, 6],
    ];

    expect(input.transpose()).toStrictEqual(expected);
  });

  it("transposes a rectangular matrix (more columns than rows)", () => {
    const input = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const expected = [
      [1, 4],
      [2, 5],
      [3, 6],
    ];

    expect(input.transpose()).toStrictEqual(expected);
  });

  it("returns empty array for empty matrix", () => {
    expect([].transpose()).toEqual([]);
  });

  it("transposes a single row matrix into a column", () => {
    const input = [[1, 2, 3]];
    const expected = [[1], [2], [3]];

    expect(input.transpose()).toStrictEqual(expected);
  });

  it("transposes a single column matrix into a row", () => {
    const input = [[1], [2], [3]];
    const expected = [[1, 2, 3]];

    expect(input.transpose()).toEqual(expected);
  });

  it("works with string matrices", () => {
    const input = [
      ["a", "b"],
      ["c", "d"],
    ];
    const expected = [
      ["a", "c"],
      ["b", "d"],
    ];

    expect(input.transpose()).toEqual(expected);
  });

  it("does not mutate the original matrix", () => {
    const input = [
      [1, 2],
      [3, 4],
    ];
    const expected = [
      [1, 3],
      [2, 4],
    ];

    const copy = structuredClone(input);
    const transposed = input.transpose();

    expect(input).toStrictEqual(copy);
    expect(transposed).toStrictEqual(expected);
  });
});
