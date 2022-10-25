import {
  DEFAULT_PAGINATION_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_FILTER_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { prisma } from '../../prisma'

const build = {
  sorting: ({ sortingMode, descendingOrder }: SortOptions) => {
    const order = descendingOrder ? 'desc' : 'asc'

    const sortKeys: Record<
      number,
      keyof FilterProperties<CharacterObject, number>
    > = {
      0: 'auctionEnd',
      1: 'level',
      2: 'currentBid',
    }

    const sortKey = sortKeys[sortingMode] ?? sortKeys[0]

    return { [sortKey]: order }
  },
  pagination: ({ pageIndex, pageSize }: PaginationOptions) => ({
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
    ...build.pagination(paginationOptions),
    ...build.sorting(sortingOptions),
  })
}

export default { queryBuilder }
