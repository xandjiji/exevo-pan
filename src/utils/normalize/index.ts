export const normalize = (
  value: number,
  interval: [number, number],
): number => {
  const [min, max] = interval
  return (value - min) / (max - min)
}
