import { endpoints } from 'Constants'
import { PaginationOptions } from './types'

const DEFAULT_PAGE_INDEX = 0
const DEFAULT_PAGE_SIZE = 10

const EMPTY_RESPONSE: PaginatedData<CharacterObject> = {
  page: [],
  pageIndex: 0,
  totalItems: 0,
  startOffset: 0,
  endOffset: 0,
  hasPrev: false,
  hasNext: false,
}

export default class AuctionsClient {
  static currentAuctionsUrl = endpoints.CURRENT_AUCTIONS

  static async fetchAuctionPage({
    pageIndex = DEFAULT_PAGE_INDEX,
    pageSize = DEFAULT_PAGE_SIZE,
  }: PaginationOptions): Promise<PaginatedData<CharacterObject>> {
    const body = { pageIndex, pageSize }

    try {
      const response = await fetch(this.currentAuctionsUrl, {
        method: 'POST',
        body: JSON.stringify(body),
      })

      const data = (await response.json()) as PaginatedData<CharacterObject>

      return data
    } catch (error: unknown) {
      console.log(error)
      return { ...EMPTY_RESPONSE, pageIndex }
    }
  }
}
