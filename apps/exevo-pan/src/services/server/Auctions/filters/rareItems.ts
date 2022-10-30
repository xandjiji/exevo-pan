import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ rareItemSet }) => rareItemSet.size === 0,
  addQuery: ({ rareItemSet }) => ({
    rareItems: { some: { name: { in: [...rareItemSet] } } },
  }),
}

export default filterQuery
