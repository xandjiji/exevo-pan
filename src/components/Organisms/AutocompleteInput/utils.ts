export const filterByTerm = (term: string, array: Option[]): Option[] => {
  const regex = new RegExp(term, 'i')
  return array.filter((item) => regex.test(item.name))
}

export function circularArrayIndex<T>(index: number, array: Array<T>): number {
  const maxIndex = array.length - 1
  if (index < 0) {
    return maxIndex
  }
  if (index > maxIndex) {
    return 0
  }

  return index
}
