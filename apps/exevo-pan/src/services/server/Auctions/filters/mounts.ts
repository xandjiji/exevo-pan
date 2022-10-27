import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ mountSet }) => mountSet.size === 0,
  addQuery: ({ mountSet }) => ({ mounts: { hasEvery: [...mountSet] } }),
}

export default filterQuery
