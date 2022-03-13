export const clampValue = (value: number, range: [number, number]): number => {
  const [min, max] = range
  return value < min ? min : value > max ? max : value
}
