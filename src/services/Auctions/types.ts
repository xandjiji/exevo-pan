export type PaginationOptions = {
  pageIndex?: number
  pageSize?: number
}

export type CacheObject = Record<string, PaginatedData<CharacterObject>>
