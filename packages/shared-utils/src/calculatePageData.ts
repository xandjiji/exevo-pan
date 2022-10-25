type CalculatePageDataArgs = {
  totalItems: number
} & PaginationOptions

export const calculatePageData = ({
  pageIndex,
  pageSize,
  totalItems,
}: CalculatePageDataArgs): PageData => {
  if (pageSize < 1) {
    return {
      pageIndex: 0,
      totalItems,
      startOffset: 1,
      endOffset: totalItems,
      hasPrev: false,
      hasNext: false,
    }
  }

  const pageCount = Math.ceil(totalItems / pageSize)

  const hasPrev = pageIndex > 0
  const hasNext = pageIndex + 1 < pageCount

  const startOffset = pageIndex * pageSize + 1
  const endOffset = hasNext ? (pageIndex + 1) * pageSize : totalItems

  return {
    pageIndex,
    totalItems,
    startOffset,
    endOffset,
    hasPrev,
    hasNext,
  }
}
