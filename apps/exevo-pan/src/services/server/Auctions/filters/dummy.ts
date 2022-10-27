import { FilterQuery } from 'types/FilterQuery'

const dummies = [
  'ferumbras exercise dummy',
  'monk exercise dummy',
  'demon exercise dummy',
]

const filterQuery: FilterQuery = {
  filterSkip: ({ dummy }) => !dummy,
  addQuery: () => ({ storeItems: { some: { name: { in: dummies } } } }),
}

export default filterQuery
