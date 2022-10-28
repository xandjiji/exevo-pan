import { endpoints } from 'Constants'
import { DEFAULT_SORT_OPTIONS } from 'shared-utils/dist/contracts/Filters/defaults'
import { serializeUrlParams } from 'hooks/useUrlParamsState/utils'
import { schema as filtersSchema } from 'modules/BazaarAuctions/contexts/useFilters/schema'
import { schema as auctionsSchema } from 'modules/BazaarAuctions/contexts/useAuctions/schema'
import { filterActiveHighlights } from './utils'
import { FetchAuctionPageArgs, FetchAuctionByIdParameters } from './types'

export default class AuctionsClient {
  static async fetchAuctionPage({
    paginationOptions,
    sortOptions,
    filterOptions,
    history,
  }: FetchAuctionPageArgs): Promise<PaginatedData<CharacterObject>> {
    const serializedFilters = serializeUrlParams({
      values: { ...filterOptions, ...paginationOptions, ...sortOptions },
      schema: {
        ...filtersSchema,
        ...auctionsSchema.pagination,
        ...auctionsSchema.buildSortingSchema(
          DEFAULT_SORT_OPTIONS[history ? 'history' : 'current'],
        ),
      },
    })

    const response = await fetch(
      `${endpoints.AUCTIONS}?history=${history}${
        serializedFilters ? '&' : ''
      }${serializedFilters}`,
    )

    const result: PaginatedData<CharacterObject> = await response.json()

    return result
  }

  static async fetchAuctionById({
    auctionId,
    from = 'any',
  }: FetchAuctionByIdParameters): Promise<CharacterObject | undefined> {
    try {
      const response = await fetch(
        `${endpoints.AUCTION_BY_ID}/?from=${from}&id=${auctionId}`,
      )

      if (response.status === 404) {
        throw Error(`Auction id ${auctionId} not found`)
      }

      const found = await response.json()
      return found
    } catch (error) {
      return undefined
    }
  }
}
