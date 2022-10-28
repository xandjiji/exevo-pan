export type FetchAuctionPageArgs = {
  filterOptions?: Partial<FilterOptions>
  sortOptions?: Partial<SortOptions>
  paginationOptions?: Partial<PaginationOptions>
  history: boolean
}

export type FetchAuctionByIdParameters = {
  auctionId: number
  from?: 'current' | 'history' | 'any'
}
