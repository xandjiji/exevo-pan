import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ biddedOnly }) => !biddedOnly,
  addQuery: () => ({ hasBeenBidded: true }),
}

export default filterQuery
