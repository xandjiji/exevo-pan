import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ transferAvailable }) => !transferAvailable,
  addQuery: () => ({ transfer: true }),
}

export default filterQuery
