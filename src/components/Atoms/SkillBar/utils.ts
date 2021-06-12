export const getDecimalPart = (float: number): number => {
  const [, decimal] = float.toString().split('.')
  return decimal ? parseInt(decimal.padEnd(2, '0'), 10) : 0
}
