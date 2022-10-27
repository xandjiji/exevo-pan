import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ location }) => location.size === 0,
  addQuery: ({ location }) => ({
    server: { serverLocation: { in: [...location] } },
  }),
}

export default filterQuery
