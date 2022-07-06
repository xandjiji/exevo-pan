export const isObjectEmpty = (object: Record<string, number>): boolean =>
  !Object.values(object).some((amount) => amount !== 0)
