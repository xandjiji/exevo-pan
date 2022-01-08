import { PaginationData } from './types'

const DEFAULT_INDEX = 0
const DEFAULT_PAGE_SIZE = 10

const defaultOptions: PaginationOptions = {
  pageIndex: DEFAULT_INDEX,
  pageSize: DEFAULT_PAGE_SIZE,
}

export const paginateData = <T>(
  array: T[],
  { pageIndex, pageSize } = defaultOptions,
): PaginationData<T> => {
  const totalItems = array.length

  if (pageSize < 1) {
    return {
      page: array,
      pageIndex: 0,
      totalItems,
      startOffset: 1,
      endOffset: totalItems,
      hasPrev: false,
      hasNext: false,
    }
  }

  const page = array.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)
  const pageCount = Math.ceil(totalItems / pageSize)

  const hasPrev = pageIndex > 0
  const hasNext = pageIndex + 1 < pageCount

  const startOffset = pageIndex * pageSize + 1
  const endOffset = hasNext ? (pageIndex + 1) * pageSize : totalItems

  return {
    page,
    pageIndex,
    totalItems,
    startOffset,
    endOffset,
    hasPrev,
    hasNext,
  }
}
