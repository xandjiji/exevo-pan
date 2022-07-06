export const filterByTerm = (term: string, array: Option[]): Option[] => {
  const regex = new RegExp(term, 'i')
  return array.filter((item) => regex.test(item.name))
}
