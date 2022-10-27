import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ imbuementsSet }) => imbuementsSet.size === 0,
  addQuery: ({ imbuementsSet }) => ({
    imbuements: { hasEvery: [...imbuementsSet] },
  }),
}

export default filterQuery
