export const isInRange = (
  value: number,
  [min, max]: [number, number],
): boolean => value >= min && value <= max
