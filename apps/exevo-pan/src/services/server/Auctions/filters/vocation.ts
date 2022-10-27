import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ vocation }) => vocation.size === 0,
  addQuery: ({ vocation }) => ({ vocationId: { in: [...vocation] } }),
}

export default filterQuery
