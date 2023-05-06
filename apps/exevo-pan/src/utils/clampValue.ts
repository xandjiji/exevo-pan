export const clampValue = (
  value: number,
  [min, max]: [number, number],
): number => (value < min ? min : value > max ? max : value)
