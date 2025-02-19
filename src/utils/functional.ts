export function pipe<T>(...funcs: ((arg: T) => T)[]): (value: T) => T {
  return function (value: T): T {
    return funcs.reduce((acc, f) => f(acc), value)
  }
}