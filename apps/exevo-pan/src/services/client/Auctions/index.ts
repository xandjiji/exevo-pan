import {
  serializeFilter,
  serializePagination,
  serializeSort,
} from 'shared-utils/dist/contracts/Filters/schemas'
import { links, endpoints } from 'Constants'
import { FetchAuctionPageArgs, FetchAuctionByIdArgs } from './types'

export default class AuctionsClient {
  private static getAuctionMode(history: boolean): keyof typeof serializeSort {
    return history ? 'history' : 'current'
  }

  static async fetchAuctionPage({
    filterOptions,
    paginationOptions,
    sortOptions,
    history,
  }: FetchAuctionPageArgs): Promise<PaginatedData<CharacterObject>> {
    const endpoint = new URL(`${links.CANONICAL}${endpoints.AUCTIONS_ROUTE}`)
    const currentParams = new URLSearchParams()

    serializeFilter({ values: { ...filterOptions }, currentParams })
    serializePagination({ values: { ...paginationOptions }, currentParams })
    serializeSort[this.getAuctionMode(history)]({
      values: { ...sortOptions },
      currentParams,
    })

    endpoint.search = currentParams.toString()
    endpoint.searchParams.set('history', history.toString())

    const response = await fetch(endpoint)

    return response.json()
  }

  static async fetchAuctionById({
    id,
    from = 'any',
  }: FetchAuctionByIdArgs): Promise<CharacterObject | undefined> {
    try {
      const endpoint = new URL(endpoints.AUCTION_ROUTE)

      endpoint.searchParams.set('id', id.toString())
      endpoint.searchParams.set('from', from)

      const response = await fetch(endpoint)

      if (response.status === 404) {
        throw Error(`Auction id ${id} not found`)
      }

      return response.json()
    } catch {
      return undefined
    }
  }
}
