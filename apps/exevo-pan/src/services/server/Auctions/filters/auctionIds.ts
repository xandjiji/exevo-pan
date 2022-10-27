/* eslint-disable no-param-reassign */
import { FilterQuery } from 'types/FilterQuery'

const filterQuery: FilterQuery = {
  filterSkip: ({ auctionIds }) => auctionIds.size === 0,
  addQuery: ({ auctionIds }) => ({ id: { in: [...auctionIds] } }),
}

export default filterQuery
