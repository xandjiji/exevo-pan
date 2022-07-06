export const circularArrayIndex = <T>(
  index: number,
  array: Array<T>,
): number => {
  const maxIndex = array.length - 1
  if (index < 0) {
    return maxIndex
  }
  if (index > maxIndex) {
    return 0
  }

  return index
}
