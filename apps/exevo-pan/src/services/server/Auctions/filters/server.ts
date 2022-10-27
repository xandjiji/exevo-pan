import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ serverSet }) => serverSet.size === 0,
  addQuery: ({ serverSet }) => ({
    server: { serverName: { in: [...serverSet] } },
  }),
}

export default filterQuery
