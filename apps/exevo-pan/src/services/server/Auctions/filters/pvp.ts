import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ pvp }) => pvp.size === 0,
  addQuery: ({ pvp }) => ({
    server: { pvpType: { in: [...pvp] } },
  }),
}

export default filterQuery
