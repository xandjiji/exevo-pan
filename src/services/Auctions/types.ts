export type PaginationOptions = {
  pageIndex?: number
  pageSize?: number
}

export type SortOptions = {
  sortingMode: number
  descendingOrder: boolean
}

export type CacheObject = Record<string, PaginatedData<CharacterObject>>
