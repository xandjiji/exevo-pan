import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ charmsSet }) => charmsSet.size === 0,
  addQuery: ({ charmsSet }) => ({ charms: { hasEvery: [...charmsSet] } }),
}

export default filterQuery
