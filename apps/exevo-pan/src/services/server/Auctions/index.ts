import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { calculatePageData } from 'shared-utils/dist/calculatePageData'
import { prisma } from '../../prisma'
import { buildQuery } from './queryBuilder'
import { FetchAuctionPageArgs } from './types'

export default class AuctionsClient {
  private static currentTimestamp(): number {
    return Math.round(+new Date() / 1000)
  }

  static async fetchAuctionPage({
    filterOptions,
    paginationOptions: paginationOptionsArgs,
    sortOptions,
    history,
  }: FetchAuctionPageArgs): Promise<PaginatedData<CharacterObject>> {
    const where = {
      ...buildQuery.filters({
        ...DEFAULT_FILTER_OPTIONS,
        ...filterOptions,
      }),
      auctionEnd: { gt: this.currentTimestamp() },
    }

    const paginationOptions = {
      ...DEFAULT_PAGINATION_OPTIONS,
      ...paginationOptionsArgs,
    }

    const model = history ? 'currentAuction' : 'historyAuction'

    const [page, totalItems] = await prisma.$transaction([
      prisma[model].findMany({
        where,
        ...buildQuery.pagination(paginationOptions),
        ...buildQuery.sorting({ ...DEFAULT_SORT_OPTIONS, ...sortOptions }),
        include: { rareItems: true, server: true },
      }),
      prisma[model].count({ where }),
    ])

    return {
      ...calculatePageData({ ...paginationOptions, totalItems }),
      descendingOrder: true,
      sortingMode: 0,
      page,
    }
  }

  static async fetchHighlightedAuctions(): Promise<CharacterObject[]> {
    return []
  }
}
