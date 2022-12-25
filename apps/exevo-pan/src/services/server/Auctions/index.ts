import {
  serializeFilter,
  serializePagination,
  serializeSort,
} from 'shared-utils/dist/contracts/Filters/schemas'
import { endpoints } from 'Constants'
import { filterActiveHighlightedIds } from './utils'
import { FetchAuctionPageArgs } from './types'

const MINIMUM_HIGHLIGHTED_AMOUNT = 2

export default class AuctionsClient {
  static async fetchAuctionPage({
    filterOptions,
    paginationOptions,
    sortOptions,
    history,
  }: FetchAuctionPageArgs): Promise<PaginatedData<CharacterObject>> {
    const endpoint = new URL(
      history ? endpoints.HISTORY_AUCTIONS : endpoints.CURRENT_AUCTIONS,
    )
    const currentParams = new URLSearchParams()

    serializeFilter({ values: { ...filterOptions }, currentParams })
    serializePagination({ values: { ...paginationOptions }, currentParams })
    serializeSort({
      values: { ...sortOptions },
      currentParams,
    })

    endpoint.search = currentParams.toString()

    const response = await fetch(endpoint.toString())

    return response.json()
  }

  static async fetchHighlightedAuctions(): Promise<CharacterObject[]> {
    try {
      const response = await fetch(endpoints.BACKOFFICE_API)
      const highlightedAuctionsData: HighlightedAuctionData[] =
        await response.json()

      const highlightedAuctionIds = new Set(
        filterActiveHighlightedIds(highlightedAuctionsData),
      )

      let highlightedAuctions: CharacterObject[] = []

      if (highlightedAuctionIds.size > 0) {
        const { page } = await this.fetchAuctionPage({
          filterOptions: { auctionIds: highlightedAuctionIds },
          paginationOptions: { pageSize: highlightedAuctionIds.size },
          history: false,
        })

        highlightedAuctions = page
      }

      const emptyHighlightedSpots =
        MINIMUM_HIGHLIGHTED_AMOUNT - highlightedAuctions.length

      if (emptyHighlightedSpots <= 0) return highlightedAuctions

      const { page: highestValueAuctions } = await this.fetchAuctionPage({
        filterOptions: { biddedOnly: true },
        sortOptions: { sortingMode: 2, descendingOrder: true },
        history: false,
      })

      return [
        ...highlightedAuctions,
        ...highestValueAuctions
          .filter(({ id }) => !highlightedAuctionIds.has(id))
          .slice(0, emptyHighlightedSpots),
      ].sort((a, b) => a.auctionEnd - b.auctionEnd)
    } catch (error: unknown) {
      console.log(error)
      return []
    }
  }
}
