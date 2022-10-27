import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ storeMountSet }) => storeMountSet.size === 0,
  addQuery: ({ storeMountSet }) => ({
    storeMounts: { hasEvery: [...storeMountSet] },
  }),
}

export default filterQuery
