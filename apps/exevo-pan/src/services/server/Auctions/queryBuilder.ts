import { AuctionQuery } from 'types/FilterQuery'
import * as filterQueries from './filters'
import { PrismaAuctionsQuery, SortKeys } from './types'

export const buildQuery = {
  filters: (filterOptions: FilterOptions): AuctionQuery => ({
    AND: Object.values(filterQueries)
      .filter(({ filterSkip }) => !filterSkip(filterOptions))
      .map(({ addQuery }) => addQuery(filterOptions)),
  }),
  sorting: ({
    sortingMode,
    descendingOrder,
  }: SortOptions): PrismaAuctionsQuery => {
    const order = descendingOrder ? 'desc' : 'asc'

    const sortKeys: SortKeys = {
      0: 'auctionEnd',
      1: 'level',
      2: 'currentBid',
    }

    const sortKey = sortKeys[sortingMode] ?? sortKeys[0]

    return { orderBy: { [sortKey]: order } }
  },
  pagination: ({
    pageIndex,
    pageSize,
  }: PaginationOptions): PrismaAuctionsQuery => ({
    take: pageSize,
    skip: pageIndex * pageSize,
  }),
}
