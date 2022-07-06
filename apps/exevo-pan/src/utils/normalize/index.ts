export const normalize = (
  value: number,
  [min, max]: [number, number],
): number => (value - min) / (max - min)
