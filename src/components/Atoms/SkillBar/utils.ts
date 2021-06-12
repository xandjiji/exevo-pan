export const getDecimalPart = (float: number): number =>
  Math.round((float % 1) * 100)
