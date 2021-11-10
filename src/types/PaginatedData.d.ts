declare interface PaginatedData<T> {
  page: T[]
  pageIndex: number
  totalItems: number
  startOffset: number
  endOffset: number
  hasPrev: boolean
  hasNext: boolean
}
