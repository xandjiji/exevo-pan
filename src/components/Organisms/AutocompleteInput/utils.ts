export const filterByTerm = (term: string, array: Option[]): Option[] => {
  const regex = new RegExp(term, 'ig')
  return array.filter(item => regex.test(item.name))
}
