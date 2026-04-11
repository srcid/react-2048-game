import { pipe } from "../../src/utils/functional"; // adjust the import path to match your file

describe("pipe", () => {
  it("returns the original value unchanged when no functions are provided", () => {
    const piped = pipe<number>();
    expect(piped(42)).toBe(42);
  });

  it("returns the original value unchanged when an empty array is spread", () => {
    const piped = pipe<number>(...[]);
    expect(piped(42)).toBe(42);
  });

  it("applies a single function correctly", () => {
    const double = (n: number) => n * 2;
    const piped = pipe(double);
    expect(piped(5)).toBe(10);
  });

  it("applies multiple functions from left to right (composition order)", () => {
    const addOne = (n: number) => n + 1;
    const double = (n: number) => n * 2;
    const subtractThree = (n: number) => n - 3;

    const piped = pipe(addOne, double, subtractThree);
    // Execution flow: 5 → 6 → 12 → 9
    expect(piped(5)).toBe(9);
  });

  it("executes functions in the exact order they are passed (left-to-right)", () => {
    let executionOrder = "";
    const f1 = (n: number) => {
      executionOrder += "f1";
      return n + 10;
    };
    const f2 = (n: number) => {
      executionOrder += "f2";
      return n * 3;
    };
    const f3 = (n: number) => {
      executionOrder += "f3";
      return n - 5;
    };

    const piped = pipe(f1, f2, f3);
    const result = piped(2);

    expect(result).toBe(31); // (2 + 10) * 3 - 5 = 31
    expect(executionOrder).toBe("f1f2f3");
  });

  it("works correctly with string transformations", () => {
    const toUpper = (s: string) => s.toUpperCase();
    const addExclamation = (s: string) => `${s}!`;
    const repeatTwice = (s: string) => s.repeat(2);

    const piped = pipe(toUpper, addExclamation, repeatTwice);
    expect(piped("hello")).toBe("HELLO!HELLO!");
  });

  it("works correctly with object transformations (immutable updates)", () => {
    interface User {
      name: string;
      age: number;
      active: boolean;
    }

    const incrementAge = (user: User) => ({ ...user, age: user.age + 1 });
    const activate = (user: User) => ({ ...user, active: true });
    const prefixName = (user: User) => ({ ...user, name: `Dr. ${user.name}` });

    const piped = pipe(incrementAge, activate, prefixName);

    const initial: User = { name: "Alice", age: 30, active: false };
    const result = piped(initial);

    expect(result).toEqual({
      name: "Dr. Alice",
      age: 31,
      active: true,
    });

    // Original object should remain unchanged (immutability)
    expect(initial).toEqual({ name: "Alice", age: 30, active: false });
  });

  it("handles functions that return the same value (identity-like)", () => {
    const identity = <T>(x: T) => x;
    const piped = pipe(identity<number>, identity<number>, identity<number>);
    expect(piped(100)).toBe(100);
  });

  it("works with a large number of functions", () => {
    const increment = (n: number) => n + 1;
    const piped = pipe(increment, increment, increment, increment, increment);
    expect(piped(0)).toBe(5);
  });
});
