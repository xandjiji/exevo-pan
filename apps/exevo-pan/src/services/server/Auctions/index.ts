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
    history,
    ...args
  }: FetchAuctionPageArgs): Promise<PaginatedData<CharacterObject>> {
    const where = {
      auctionEnd: history ? undefined : { gt: this.currentTimestamp() },
      ...buildQuery.filters({
        ...DEFAULT_FILTER_OPTIONS,
        ...args.filterOptions,
      }),
    }

    const sortOptions = {
      ...DEFAULT_SORT_OPTIONS,
      ...args.sortOptions,
    }

    const paginationOptions = {
      ...DEFAULT_PAGINATION_OPTIONS,
      ...args.paginationOptions,
    }

    const query = {
      where,
      ...buildQuery.pagination(paginationOptions),
      ...buildQuery.sorting(sortOptions),
      include: { server: true, rareItems: true },
    }

    const [page, totalItems] = history
      ? await prisma.$transaction([
          prisma.historyAuction.findMany(query),
          prisma.historyAuction.count({ where }),
        ])
      : await prisma.$transaction([
          prisma.currentAuction.findMany(query),
          prisma.currentAuction.count({ where }),
        ])

    return {
      ...calculatePageData({ ...paginationOptions, totalItems }),
      ...sortOptions,
      page,
    }
  }

  static async fetchHighlightedAuctions(): Promise<CharacterObject[]> {
    return []
  }
}
