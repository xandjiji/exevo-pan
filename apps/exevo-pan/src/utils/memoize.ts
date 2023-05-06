export const memoize = <R, T extends (...args: any[]) => R>(fn: T): T => {
  const cache = {} as Record<string, R>

  const result = (...args: any[]) => {
    const argsKey = JSON.stringify(args)
    if (cache[argsKey] === undefined) {
      cache[argsKey] = fn(...args)
    }

    return cache[argsKey]
  }

  return result as T
}
