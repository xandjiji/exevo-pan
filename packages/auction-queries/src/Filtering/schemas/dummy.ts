const dummySet = new Set([
  'ferumbras exercise dummy',
  'monk exercise dummy',
  'demon exercise dummy',
])

const filterSkip: FilterSkip = ({ dummy }): boolean => !dummy

const filterTest: FilterTest =
  () =>
  ({ storeItems }): boolean =>
    storeItems.some(({ name }) => dummySet.has(name))

const schema: FilterSchema = {
  filterSkip,
  filterTest,
}

export default schema
