export interface FetchAuctionPageParameters extends Partial<FilterBodyPayload> {
  endpoint: string
}

export interface FetchAuctionByIdParameters {
  auctionId: number
  endpoint: string
}

export type CacheObject = Record<string, PaginatedData<CharacterObject>>
