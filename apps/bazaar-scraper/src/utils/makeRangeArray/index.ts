export const makeRangeArray = (start: number, end: number): number[] => {
  const array = []
  for (let i = start; i <= end; i += 1) {
    array.push(i)
  }
  return array
}
