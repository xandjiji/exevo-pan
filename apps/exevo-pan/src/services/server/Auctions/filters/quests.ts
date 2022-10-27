import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ questSet }) => questSet.size === 0,
  addQuery: ({ questSet }) => ({ quests: { hasEvery: [...questSet] } }),
}

export default filterQuery
