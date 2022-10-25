/* eslint-disable no-param-reassign */
import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ auctionIds }) => auctionIds.size === 0,
  addQuery: ({ auctionIds }, query) => {
    query.id = { in: [...auctionIds] }

    return query
  },
}

export default filterQuery
