declare global {
  interface Array<T> {
    transpose(this: T[]): T[];
  }
}

Array.prototype.transpose = function <T>(this: T[][]): T[][] {
  if (this.length === 0) return [];
  return this[0].map((_, colIndex) => this.map((row) => row[colIndex]));
};

export {};
