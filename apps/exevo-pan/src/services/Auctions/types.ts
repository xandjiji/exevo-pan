export interface FetchAuctionPageParameters extends Partial<FilterBodyPayload> {
  endpoint: string
}

export interface FetchAuctionByIdParameters {
  auctionId: number
  endpoint: string
}

export type CacheObject = Record<string, PaginatedData<CharacterObject>>

export type RawHighlightedData = {
  name: string
  expiration: number
  metadata: string
}
