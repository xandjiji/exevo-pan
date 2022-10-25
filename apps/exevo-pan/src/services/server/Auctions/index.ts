import {
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { AuctionQuery } from 'types/FilterQuery'
import { Prisma } from '@prisma/client'
import { prisma } from '../../prisma'
import * as filterQueries from './filters'
import { SortKeys } from './types'

const build = {
  filters: (filterOptions: FilterOptions): AuctionQuery => {
    const where: AuctionQuery = {}

    Object.values(filterQueries)
      /* @ ToDo: is this check necessary? remove if it isnt */
      .filter((item) => typeof item !== 'boolean')
      .filter(({ filterSkip }) => !filterSkip(filterOptions))
      .forEach(({ addQuery }) => addQuery(filterOptions, where))

    return where
  },
  sorting: ({
    sortingMode,
    descendingOrder,
  }: SortOptions): Prisma.CurrentAuctionFindManyArgs => {
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
  }: PaginationOptions): Prisma.CurrentAuctionFindManyArgs => ({
    take: pageSize,
    skip: pageIndex * pageSize,
  }),
}

const queryBuilder = ({
  filterOptions = DEFAULT_FILTER_OPTIONS,
  sortingOptions = DEFAULT_SORT_OPTIONS,
  paginationOptions = DEFAULT_PAGINATION_OPTIONS,
}) => {
  prisma.currentAuction.findMany({
    where: build.filters(filterOptions),
    ...build.pagination(paginationOptions),
    ...build.sorting(sortingOptions),
  })
}

export default { queryBuilder }
