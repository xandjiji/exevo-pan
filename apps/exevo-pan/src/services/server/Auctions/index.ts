import {
  DEFAULT_FILTER_OPTIONS,
  DEFAULT_SORT_OPTIONS,
  DEFAULT_PAGINATION_OPTIONS,
} from 'shared-utils/dist/contracts/Filters/defaults'
import { calculatePageData } from 'shared-utils/dist/calculatePageData'
import { endpoints } from 'Constants'
import { prisma } from '../../prisma'
import { buildQuery } from './queryBuilder'
import { filterActiveHighlightedIds } from './utils'
import { FetchAuctionPageArgs } from './types'

const MINIMUM_HIGHLIGHTED_AMOUNT = 2

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
      ...DEFAULT_SORT_OPTIONS[history ? 'history' : 'current'],
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
    try {
      const response = await fetch(endpoints.BACKOFFICE_API)
      const highlightedAuctionsData: HighlightedAuctionData[] =
        await response.json()

      const highlightedAuctionIds = filterActiveHighlightedIds(
        highlightedAuctionsData,
      )

      const highlightedAuctions = await prisma.currentAuction.findMany({
        where: {
          id: { in: highlightedAuctionIds },
          auctionEnd: { gt: this.currentTimestamp() },
        },
        include: { server: true, rareItems: true },
      })

      if (highlightedAuctions.length >= MINIMUM_HIGHLIGHTED_AMOUNT) {
        return highlightedAuctions
      }

      const fillHighlightedAuctions = await prisma.currentAuction.findMany({
        where: {
          id: { notIn: highlightedAuctionIds },
          auctionEnd: { gt: this.currentTimestamp() },
          hasBeenBidded: true,
        },
        orderBy: { currentBid: 'desc' },
        take: MINIMUM_HIGHLIGHTED_AMOUNT - highlightedAuctions.length,
        include: { server: true, rareItems: true },
      })

      return [...highlightedAuctions, ...fillHighlightedAuctions].sort(
        (a, b) => a.auctionEnd - b.auctionEnd,
      )
    } catch (error: unknown) {
      console.log(error)
      return []
    }
  }
}
